import React from 'react';
import { Button } from 'reactstrap';

var moment = require('moment');

class PublicidadRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectPublicidad = this.selectPublicidad.bind(this);
        this.actualizar = this.actualizar.bind(this)
    }
    
    selectPublicidad() {
        this.props.selector(this.props.publicidad)
    }

    actualizar() {
        this.props.actualizarListaDeObjetos(this.props.publicidad)
    }
    
    handleSubmit(id) {
        fetch("http://localhost:8888/publicidades/" + id, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(this.actualizar);
      }

    render() {      
        return(
            <tr onClick={this.selectPublicidad}>
              <td>{this.props.publicidad.cliente.agenciaComercial}</td>
              <td>{this.props.publicidad.precio}</td>
              <td>{moment(this.props.publicidad.fechaDeEntrada).format('DD-M-YYYY')}</td>
              <td>{moment(this.props.publicidad.fechaDeSalida).format('DD-M-YYYY')}</td>
              <td>{this.props.publicidad.cantidadPorDia}</td>
              <td>{this.props.publicidad.pagado ? "Pagado" : "Adeuda" }  </td>
              <td>{this.props.publicidad.horariosDeSalida}</td>
              <td>{this.props.publicidad.dias}</td>
              <td><Button variant="primary">Editar</Button>
                  <Button variant="danger" onClick={() => {
                  this.handleSubmit(this.props.publicidad._id);
                  }}>Borrar</Button></td>
          </tr>)
      
    }
}

  export default PublicidadRow