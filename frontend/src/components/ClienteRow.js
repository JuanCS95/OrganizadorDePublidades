import React from 'react';
import { Button } from 'reactstrap';

var moment = require('moment');

class ClienteRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectCliente = this.selectCliente.bind(this);
        this.actualizar = this.actualizar.bind(this)
    }
    
    selectCliente() {
        this.props.selector(this.props.cliente)
    }

    actualizar() {
        this.props.actualizarListaDeObjetos(this.props.cliente)
    }
    
    handleSubmit(id) {
        fetch("http://localhost:8888/clientes/" + id, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(this.actualizar);
      }

    render() {      
        return(
            <tr onClick={this.selectCliente}>
              <td>{this.props.cliente.agenteComercial}</td>
              <td>{this.props.cliente.agenciaComercial}</td>
              <td>{this.props.cliente.direccion}</td>
              <td>{this.props.cliente.telefono}</td>
              <td>{this.props.cliente.deuda}</td>
              <td><Button color="danger" onClick={() => {
                  this.handleSubmit(this.props.cliente._id);
                  }}>Borrar</Button></td>
          </tr>)
      
    }
}

  export default ClienteRow