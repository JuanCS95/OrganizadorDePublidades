import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class ClienteForm extends React.Component {

  constructor(props) {
      super(props);
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {cliente:props.cliente}
      this.estadoInicial = this.estadoInicial.bind(this);
    }

  componentWillReceiveProps(props) {
      this.setState({cliente: props.cliente})
  }


  handleSubmit(event) {
    if (this.state.cliente._id) {
      this.editarCliente();
    } else {
      this.agregarCliente();
    }
    event.preventDefault();
  }

  handleChange(event) {
    var newCliente = Object.assign({}, this.state.cliente);
    newCliente[event.target.name] = event.target.value;
    this.setState({cliente: newCliente});
  }
      
  agregarCliente() {
    fetch(`http://localhost:8888/clientes`, {
      method: "POST",
      body: JSON.stringify(this.state.cliente),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => this.props.listado())
      .then(this.estadoInicial);

  }

  estadoInicial() {
    this.setState({ cliente: { agenteComercial: "", agenciaComercial: "", direccion: "", telefono: "" } });
  }

  editarCliente() {
    fetch('http://localhost:8888/clientes', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain,*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.cliente)
    }).then(res => this.props.clienteChange(this.state.cliente))
      .then(this.estadoInicial);

  }

  handleSubmit(event) {
    if (this.state.cliente._id) {
      this.editarCliente();
    } else {
      this.agregarCliente();
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="agenteComercial">Agente Comercial</Label>
            <Input type="text" name="agenteComercial" value={this.state.cliente.agenteComercial} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="agenciaComercial">Agencia Comercial</Label>
            <Input type="text" name="agenciaComercial" value={this.state.cliente.agenciaComercial} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="direccion">Direccion</Label>
            <Input type="text" name="direccion" value={this.state.cliente.direccion} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="telefono">Telefono</Label>
            <Input type="text" name="telefono" value={this.state.cliente.telefono} onChange={this.handleChange} />
          </FormGroup>
          <Button type="submit" value="submit">Cargar</Button>
        </Form>
      </div>
    );
  }
}
export default ClienteForm
