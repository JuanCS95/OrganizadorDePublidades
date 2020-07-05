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
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.recalcularPresupuesto = this.recalcularPresupuesto.bind(this);

      this.handlePresupuesto = this.handlePresupuesto.bind(this);
      this.state = {  
                      selectedDias: [],
                      selectedTimes: [],
                      clientes: [],
                      cliente:"",
                      publicidad:this.props.publicidad,
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}, {name: 'Domingo', id:7}],
                      horarios: [{name:'Madrugada', id:1}, {name:'Mañana', id:2}, {name: 'Mediodia', id:3}, {name: 'Tarde', id:4}, {name: 'Noche', id:5}],
                      presupuesto: '',
                      cantidadPorDia: '',
                      presupuestador: ""
                    }
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
      this.setState({cliente: props.publicidad.cliente})
      this.setState({presupuestador: props.presupuestador})
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
    fetch(`http://localhost:8888/presupuestos`)
      .then(res => res.json())
      .then(presupuestador => this. setState({presupuestador: presupuestador}))
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

  handleChange2 = selectedDias=> {this.setState({selectedDias}, this.settingDias())};
  handleChange3 = selectedTimes=> {this.setState({selectedTimes}, this.setHorarios())};
      
  handlePresupuesto(event){
    this.setState({cantidadPorDia : event.target.value}, this.recalcularPresupuesto, this.handleChange(event))
  }

  recalcularPresupuesto(){
    console.log("se llama la funcion presupuestar");
    fetch(`http://localhost:8888/presupuestos/presupuestar`)
      // .then(res => res.json())  
      .then(res => {
          console.log('res', res)
          this.setState({presupuesto: res})
        })
      .then(this.setPrecio)
      .catch(error => console.log(error))
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
      return <Redirect to= "/publicidades"/>
  }

  estadoInicial() {
    this.setState(
      { fechaDeEntrada: new Date(), 
        publicidad: {  
                      cliente: "", 
                      precio: 0, 
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
            <Label for="precio">Monto</Label>
            <Input type="text" name="precio" value={this.state.presupuesto} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="fechaDeSalida">Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" value={moment(this.state.publicidad.fechaDeSalida).format('YYYY-MM-DD')} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="cantidadPorDia">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" value={this.state.cantidadPorDia} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup>
          <Label for="dias">Dias de la Semana</Label>
          <Multiselect
            options={this.state.dias} // Options to display in the dropdown
            selectedValues={selectedDias} // Preselected value to persist in dropdown
            onSelect={this.handleChange2} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            />
          </FormGroup>
          <FormGroup>
          <Label for="horarios">Horarios de salida</Label>
          <Multiselect
            options={this.state.horarios} // Options to display in the dropdown
            selectedValues={selectedTimes} // Preselected value to persist in dropdown
            onSelect={this.handleChange3} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            
            />
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