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
      this.state = {  
                      clientes: [],
                      cliente:"",
                      publicidad:this.props.publicidad,
                      diasSeleccionados: [],
                      horariosSeleccionados: [],
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}, {name: 'Domingo', id:7}],
                      horarios: [{name:'Madrugada', id:1}, {name:'Mañana', id:2}, {name: 'Mediodia', id:3}, {name: 'Tarde', id:4}, {name: 'Noche', id:5}]}
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
      this.setState({cliente: props.publicidad.cliente})
  }

  componentWillMount(){
     this.estadoInicial();
     this.listadoClientes();
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
    console.log(this.state.cliente);
    newPublicidad[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({publicidad: newPublicidad});
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
                      tiemposDeSalida: [], 
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
            <Input type="text" name="precio" value={this.state.publicidad.precio} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="fechaDeSalida">Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" value={moment(this.state.publicidad.fechaDeSalida).format('YYYY-MM-DD')} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="cantidadPorDia">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" value={this.state.publicidad.cantidadPorDia} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
          <Label for="dias">Dias de la Semana</Label>
          <Multiselect
            options={this.state.dias} // Options to display in the dropdown
            selectedValues={this.state.diasSeleccionados} // Preselected value to persist in dropdown
            value={this.state.publicidad.dias}
            // onSelect={this.state.diasSeleccionados} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
          <Label for="horarios">Horarios de salida</Label>
          <Multiselect
            options={this.state.horarios} // Options to display in the dropdown
            selectedValues={this.state.publicidad.horarios} // Preselected value to persist in dropdown
            // onSelect={this.state.horariosSeleccionados} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            onChange={this.handleChange}
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
          <Button type="submit" value="submit">Cargar</Button>
        </Form>
      </div>
    );
  }
}

  export default PublicidadForm