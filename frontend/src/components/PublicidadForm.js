import React from 'react';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

class PublicidadForm extends React.Component {

  constructor(props) {
      super(props);
      this.dd1= false
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {publicidad:props.publicidad}
      this.estadoInicial = this.estadoInicial.bind(this);
      this.dropdownToggle = this.dropdownToggle.bind(this);
    }

  dropdownToggle() {
    this.setState({
      dd1: !this.state.dd1
    });
  }

  componentWillReceiveProps(props) {
      this.setState({publicidad: props.publicidad})
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
      .then(this.estadoInicial);

  }

  estadoInicial() {
    this.setState({ fechaDeEntrada: new Date(), publicidad: {nombre: "", precio: 0, fechaDeSalida: Date(), cantidadPorDia: 0 }});
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
      .then(this.estadoInicial);

  }

  handleSubmit(event) {
    if (this.state.publicidad._id) {
      this.editarPublicidad();
    } else {
      this.agregarPublicidad();
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nombre">Cliente</Label>
            <Dropdown className="m-b-1" isOpen={this.state.dd1} toggle={this.dropdownToggle}>
              <DropdownToggle>
                <Button color="danger"></Button>
              </DropdownToggle>
              <DropdownMenu>
                
              </DropdownMenu>
            </Dropdown>
            {/* <Input type="text" name="nombre" value={this.state.publicidad.cliente} onChange={this.handleChange} /> */}
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