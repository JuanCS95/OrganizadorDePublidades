import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';

class PublicidadForm extends React.Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {  
                      clientes: ["fede","vale"],
                      cliente:"",
                      publicidad:this.props.publicidad,
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}]}
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
      this.setState({cliente: props.publicidad.cliente})
      console.log("soy el props",props.publicidad.cliente)
  }

  // componentWillMount(){
  //   this.estadoInicial();
  // }

  listadoClientes(){
    fetch(`http://localhost:8888/clientes`)
      .then( res => res.json())
      .then( prds => this.setState({clientes: prds}));
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
      
  agregarPublicidad() {
    fetch(`http://localhost:8888/publicidades`, {
      method: "POST",
      body: JSON.stringify(this.state.publicidad),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => this.props.listado())
      .then(this.estadoInicial());

  }

  estadoInicial() {
    this.setState({ fechaDeEntrada: new Date(), publicidad: {cliente:{agenciaComercial:" ", deuda:0}, nombre: "", precio: 0, fechaDeSalida: Date(), cantidadPorDia: 0, tiemposDeSalida: [], dias:[] }});
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
    let mostrarClientesList = this.state.clientes.map((prod) => {
      return(
          <div>
              <option value={prod} />
          </div>
      );
  });
    return (
      <div className="container" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nombre">Cliente</Label>
            <input type="text" value={this.state.cliente.agenciaComercial} onChange={this.handleChange} />
            <datalist id="clientes">
              {this.state.clientes}
            </datalist>
          </FormGroup>
          <FormGroup>
            <Label for="precio">Monto</Label>
            <Input type="text" name="precio" value={this.state.publicidad.precio} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="fechaDeSalida">Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" value={this.state.publicidad.fechaDeSalida} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="cantidadPorDia">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" value={this.state.publicidad.cantidadPorDia} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
          <Label for="Dias">Dias de la Semana</Label>
          <Multiselect
            options={this.state.dias} // Options to display in the dropdown
            selectedValues={this.handleChange} // Preselected value to persist in dropdown
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
          <Button type="submit" value="submit">Cargar</Button>
        </Form>
      </div>
    );
  }
}

  export default PublicidadForm