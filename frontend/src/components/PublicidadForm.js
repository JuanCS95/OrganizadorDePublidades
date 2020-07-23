import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from 'react-router-dom';
import blackfreebackground from '../black-free-background.png'
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
                      cantidadPorDia: 0,
                      precioCantidadPorDia: 0,
                      precioPorCantidadDeDias: 0,
                      porcentajeSemanal: 1,
                      selectedDias: [],
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}, {name: 'Domingo', id:7}],
                      selectedTimes: [],
                      horarios: [{name:'Madrugada', id:1}, {name:'Mañana', id:2}, {name: 'Mediodia', id:3}, {name: 'Tarde', id:4}, {name: 'Noche', id:5}],
                      presupuesto: '',
                      presupuestador: '',
                      publicidad: props.publicidad
                    }
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
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
  
  handleDias = selectedDias=> {this.setState({selectedDias}, this.recalcularPresupuesto, this.settingDias() )};
  handleHorarios = selectedTimes=> {this.setState({selectedTimes}, this.recalcularPresupuesto, this.setHorarios())};
      
  handlePresupuesto(event){
    this.setState({[event.target.name] : event.target.value}, this.recalcularPresupuesto, this.handleChange(event))
  }
  
  recalcularPresupuesto=()=>{
    this.calcularPrecioporVez();
    this.calcularPrecioPorDia();
    console.log("precioPorCantidaddias:", this.state.precioPorCantidadDeDias);
    console.log("precioporveces:", this.state.precioCantidadPorDia);
    let total = this.state.precioPorCantidadDeDias + this.state.precioCantidadPorDia;
    console.log("total base: ", total);
    total = total * (this.calcularPorcentajeSemanal() + this.calcularPorcentajePorHorario())
    console.log("total: ", total);
    this.setState({presupuesto: total})
    this.setPrecio();
  }

  calcularPrecioporVez=()=>{
    fetch(`http://localhost:8888/presupuestador/presupuestarVeces/`+this.state.cantidadPorDia)
      .then(res => res.json())
      .then(res => {
            console.log("response frontend: ", res);
            this.setState({precioCantidadPorDia: res})
          })
  }

  calcularPrecioPorDia=()=>{
    fetch(`http://localhost:8888/presupuestador/presupuestarDuracion/`+this.state.publicidad.fechaDeSalida)
      .then(res => res.json())
      .then(res => {
            console.log("response frontend: ", res);
            this.setState({precioPorCantidadDeDias: res})
          })
  }
  setCliente=()=>{
    this.setState({
      publicidad:{
      ...this.state.publicidad,
      cliente:this.buscandoCliente()
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
    if (lunes !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeLunes;}
    if (martes !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeMartes;}
    if (miercoles !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeMiercoles;}
    if (jueves !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeJueves;}
    if (viernes !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeViernes;}
    if (sabado !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeSabado;}
    if (domingo !== undefined){porcentajeEstimado += this.state.presupuestador.porcentajeDomingo;}
    return Math.round(porcentajeEstimado)
  }
  calcularPorcentajePorHorario=()=>{
    var porcentaje = 0;
    var madrugada = this.state.selectedTimes.find(element => element.name === "Madrugada");
    var mañana = this.state.selectedTimes.find(element => element.name === "Mañana");
    var mediodia = this.state.selectedTimes.find(element => element.name === "Mediodia");
    var tarde = this.state.selectedTimes.find(element => element.name === "Tarde");
    var noche = this.state.selectedTimes.find(element => element.name === "Noche");
    if (madrugada !== undefined){porcentaje += this.state.presupuestador.porcentajeLunes;}
    if (mañana !== undefined){porcentaje += this.state.presupuestador.porcentajeMartes;}
    if (mediodia !== undefined){porcentaje += this.state.presupuestador.porcentajeMiercoles;}
    if (tarde !== undefined){porcentaje += this.state.presupuestador.porcentajeJueves;}
    if (noche !== undefined){porcentaje += this.state.presupuestador.porcentajeViernes;}
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
    }).then(this.listado())
      console.log("state: ", this.state);
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

  event = (event)=>{
    event.preventDefault()
  }

  render() {
    const {selectedDias} = this.state;
    const {selectedTimes} = this.state;
    
    let mostrarClientesList = this.state.clientes.map((cliente) => {
      
      return(
        <option data-value={cliente}>
          {cliente.agenciaComercial}
          </option>
      );
  });

    return (
      <div className="container" >
        <Form onSubmit={this.event}>
          <div >
            <Label for="cliente">Cliente</Label>
            <input list="clientes" type="text" name="cliente" className="input-icon" value={this.state.cliente.agenciaComercial} onChange={this.handleChange} />
            <datalist id="clientes">
              {mostrarClientesList}
            </datalist>
          </div>
          <FormGroup >
            <Label for="fechaDeSalida" >Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" className="date-picker form-control"  value={moment(this.state.publicidad.fechaDeSalida).format('YYYY-MM-DD')} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup >
          <Label for="dias">Dias de la Semana</Label>
          <Multiselect class="dropdown-menu"
            options={this.state.dias} 
            selectedValues={selectedDias} 
            onSelect={this.handleDias} 
            displayValue="name" 
            placeholder="Seleccionar dias"
            />
          </FormGroup>
          <FormGroup >
            <Label for="horarios">Horarios de salida</Label>
            <Multiselect class="dropdown-menu"
              options={this.state.horarios} 
              selectedValues={selectedTimes} 
              onSelect={this.handleHorarios} 
              displayValue="name" 
              placeholder="Seleccionar horarios"
              />
          </FormGroup>
          <FormGroup >
            <Label for="cantidadPorDia" class="col-sm-2 col-form-label">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" className="int-input" value={this.state.cantidadPorDia} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup >
            <Label for="precio" class="col-sm-2 col-form-label">Monto</Label>
            <Input type="text" name="precio" className="int-input" value={this.state.presupuesto} onChange={this.handleChange}/>
          </FormGroup>
          <div >
            <Label for="pagado">Pagó</Label>
            <input
              name="pagado"
              type="checkbox"
              checked={this.state.publicidad.pagado}
              onChange={this.handleChange}></input>
          </div>
          <Button type="submit" onClick= {this.handleSubmit}  value="submit"><Link to="/publicidades" className="link-button" >Agregar</Link></Button>
        </Form>
      </div>
    );
  }
}

  export default PublicidadForm