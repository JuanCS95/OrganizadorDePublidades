import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { Redirect } from 'react-router';
var moment = require('moment');

class PublicidadForm extends React.Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDias = this.handleDias.bind(this);
      this.handleHorarios = this.handleHorarios.bind(this);
      this.recalcularPresupuesto = this.recalcularPresupuesto.bind(this);
      this.handlePresupuesto = this.handlePresupuesto.bind(this);
      this.state = {  
                      cliente:"",
                      clientes: [],
                      cantidadPorDia: '',
                      selectedDias: [],
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}, {name: 'Domingo', id:7}],
                      selectedTimes: [],
                      horarios: [{name:'Madrugada', id:1}, {name:'Mañana', id:2}, {name: 'Mediodia', id:3}, {name: 'Tarde', id:4}, {name: 'Noche', id:5}],
                      presupuesto: '',
                      presupuestador: '',
                      publicidad:this.props.publicidad
                    }
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
      this.setState({cliente: props.publicidad.cliente})
  }

  componentWillMount(){
     this.estadoInicial();
     this.listadoClientes();
     this.presupuestador();
  }
  
  listado(){
    fetch(`http://localhost:8888/publicidades`)
      .then( res => res.json())
      .then( prds => this.setState({publicidades: prds}));
  }

  listadoClientes(){
    fetch(`http://localhost:8888/clientes`)
      .then( res => res.json())
      .then( clientes => this.setState({clientes: clientes}));
  }
  
  presupuestador(){
    fetch(`http://localhost:8888/presupuestador`)
      .then(res => res.json())
      .then(presupuestador => this. setState({presupuestador: presupuestador[0]}))
  }
  
  handleSubmit(event) {
    if (this.state.publicidad._id) {
      this.editarPublicidad();
    } else {
      this.agregarPublicidad();
    }
    event.preventDefault();
  }

  handleChange(event) {
    var newPublicidad = Object.assign({}, this.state.publicidad);
    newPublicidad[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({publicidad: newPublicidad});
  }
  handleCliente = selectedCliente=> {this.setState({selectedCliente}, this.setCliente())};
  handleDias = selectedDias=> {this.setState({selectedDias}, this.recalcularPresupuesto, this.settingDias() )};
  handleHorarios = selectedTimes=> {this.setState({selectedTimes}, this.recalcularPresupuesto, this.setHorarios())};
      
  handlePresupuesto(event){
    this.setState({[event.target.name] : event.target.value}, this.recalcularPresupuesto, this.handleChange(event))
  }

  recalcularPresupuesto(){
    let precioPorDia = this.calcularPrecioPorDia()
    console.log("precioPorDia: ", precioPorDia)
    let total = precioPorDia + this.calcularPrecioporVez()
    console.log("total: ", total)
    
    total = total * (this.calcularPorcentajeSemanal() + this.calcularPorcentajePorHorario())
    
    this.setState({presupuesto: total})
    console.log("total: ", total)
    this.setPrecio();
    // 1console.log("se llama la funcion presupuestar");
    // fetch(`http://localhost:8888/presupuestador/presupuestar`)
    // .then(res => res.json())  
    // .then(res => {
    //       console.log('response', res.calcularPrecioporVez())
    //       this.setState({presupuesto: res.calcularPrecioporVez()})
    //     })
    //   .then(this.setPrecio)
    //   .catch(error => console.log(error))
  }

  calcularPrecioporVez=()=>{
    return this.state.cantidadPorDia * this.state.presupuestador.vezPorDia;
  }

  calcularPrecioPorDia=()=>{
    var fechaSalida = new Date(this.state.publicidad.fechaDeSalida);
    console.log("fecha Salida: ", fechaSalida)
    
    var fechaEntrada = this.state.publicidad.fechaDeEntrada;
    console.log("fecha Entrada: ", fechaEntrada)
    
    var dias = Math.round((fechaSalida - fechaEntrada)/ (1000 * 3600 * 24))
    console.log("cantidad de Dias", dias)
    
    var precioDias = dias * this.state.presupuestador.precioPorDia
    if(dias === "7"){
      precioDias = this.state.presupuestador.precioPorSemana
    } else if (dias === "30"){
      precioDias = this.state.presupuestador.precioPorMes
    }
    console.log("precio de dias seleccionados: ", precioDias)
    return precioDias;
  }
  setCliente=()=>{
    this.setState({
      publicidad:{
      ...this.state.publicidad,
      cliente:this.state.cliente.map(function(d){
        return d.name
      })
      }
      
    },console.log("state",this.state))
  }

  calcularPorcentajeSemanal=()=>{
    var porcentajeEstimado = 1;
    var lunes = this.state.selectedDias.find(element => element.name === "Lunes");
    var martes = this.state.selectedDias.find(element => element.name === "Martes");
    var miercoles = this.state.selectedDias.find(element => element.name === "Miercoles");
    var jueves = this.state.selectedDias.find(element => element.name === "Jueves");
    var viernes = this.state.selectedDias.find(element => element.name === "Viernes");
    var sabado = this.state.selectedDias.find(element => element.name === "Sabado");
    var domingo = this.state.selectedDias.find(element => element.name === "Domingo");
    if (lunes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeLunes;
    }
    if (martes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeMartes;
    }
    if (miercoles !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeMiercoles;
    }
    if (jueves !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeJueves;
    }
    if (viernes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeViernes;
    }
    if (sabado !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeSabado;
    }
    if (domingo !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeDomingo;
    }
    console.log("porcentaje estimado: ", porcentajeEstimado)
    return Math.round(porcentajeEstimado)
  }

  calcularPorcentajePorHorario=()=>{
    var porcentaje = 0;
    var madrugada = this.state.selectedTimes.find(element => element.name === "Madrugada");
    var mañana = this.state.selectedTimes.find(element => element.name === "Mañana");
    var mediodia = this.state.selectedTimes.find(element => element.name === "Mediodia");
    var tarde = this.state.selectedTimes.find(element => element.name === "Tarde");
    var noche = this.state.selectedTimes.find(element => element.name === "Noche");
    if (madrugada !== undefined){
      porcentaje += this.state.presupuestador.porcentajeLunes;
    }
    if (mañana !== undefined){
      porcentaje += this.state.presupuestador.porcentajeMartes;
    }
    if (mediodia !== undefined){
      porcentaje += this.state.presupuestador.porcentajeMiercoles;
    }
    if (tarde !== undefined){
      porcentaje += this.state.presupuestador.porcentajeJueves;
    }
    if (noche !== undefined){
      porcentaje += this.state.presupuestador.porcentajeViernes;
    }
    console.log("porcentaje: ", porcentaje)
    return porcentaje
  }
  settingDias=()=>{
    this.setState({
      publicidad:{
      ...this.state.publicidad,
      dias:this.state.selectedDias.map(function(d){
        return d.name
      })
      }
      
    },console.log("state",this.state))
  }

  setHorarios=()=>{
    this.setState({
      publicidad:{
        ...this.state.publicidad,
        horariosDeSalida:this.state.selectedTimes.map(function(h){
          return h.name
        })
      }
    })
  }

  setPrecio=()=>{
    this.setState({
      publicidad:{
        ...this.state.publicidad,
        precio:this.state.presupuesto
      }
    })
  }


  agregarPublicidad() {
    fetch(`http://localhost:8888/publicidades`, {
      method: "POST",
      body: JSON.stringify(this.state.publicidad),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
      console.log("state: ", this.state);
      return <Redirect to= "/publicidades"/>
  }

  estadoInicial() {
    this.setState(
      { 
        publicidad: {  
                      cliente: "", 
                      precio: 0, 
                      fechaDeEntrada: new Date(),
                      fechaDeSalida: new Date(), 
                      cantidadPorDia: 0, 
                      horariosDeSalida: [], 
                      dias:[] 
                    }
        }
    );
  }

  editarPublicidad() {
    fetch('http://localhost:8888/publicidades', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain,*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.publicidad)
    }).then(res => this.props.publicidadChange(this.state.publicidad))
      .then(this.estadoInicial());

  }


  render() {
    const {selectedDias} = this.state;
    const {selectedTimes} = this.state;
    
    let mostrarClientesList = this.state.clientes.map((cliente) => {
      return(
          <option data-value={cliente._id}>
          {cliente.agenciaComercial}
          </option>
      );
  });
    return (
      <div className="container" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="cliente">Cliente</Label>
            <input list="clientes" type="text" value={this.state.cliente.agenciaComercial} onChange={this.handleChange} />
            <datalist id="clientes">
              {mostrarClientesList}
            </datalist>
          </FormGroup>
          <FormGroup>
            <Label for="fechaDeSalida">Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" value={moment(this.state.publicidad.fechaDeSalida).format('YYYY-MM-DD')} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup>
          <Label for="dias">Dias de la Semana</Label>
          <Multiselect
            options={this.state.dias} // Options to display in the dropdown
            selectedValues={selectedDias} // Preselected value to persist in dropdown
            onSelect={this.handleDias} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            />
          </FormGroup>
          <FormGroup>
          <Label for="horarios">Horarios de salida</Label>
          <Multiselect
            options={this.state.horarios} // Options to display in the dropdown
            selectedValues={selectedTimes} // Preselected value to persist in dropdown
            onSelect={this.handleHorarios} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            />
          </FormGroup>
          <FormGroup>
            <Label for="cantidadPorDia">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" value={this.state.cantidadPorDia} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup>
            <Label for="precio">Monto</Label>
            <Input type="text" name="precio" value={this.state.presupuesto} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup >
            <Label for="pagado">Pagó</Label>
            <input
              name="pagado"
              type="checkbox"
              checked={this.state.publicidad.pagado}
              onChange={this.handleChange}></input>
          </FormGroup>
          <Button type="submit" value="submit">Agregar</Button>
        </Form>
      </div>
    );
  }
}

  export default PublicidadForm