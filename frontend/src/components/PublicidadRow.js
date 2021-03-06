import React from 'react';
import { Button } from 'reactstrap';
import { Link, Route} from 'react-router-dom';
import PublicidadForm from './PublicidadForm';

function PublicidadFormComponent()  {
  return (<PublicidadForm entity="publicidad"/>)
}

var moment = require('moment');

class PublicidadRow extends React.Component {

    constructor(props) {
        super(props);
        this.selectPublicidad = this.selectPublicidad.bind(this);
        this.actualizar = this.actualizar.bind(this)
        this.state = {
                      publicidad: ''
                      };
    }
    
    selectedPublicidad() {
        this.props.selector(this.props.publicidad)
    }

    selectPublicidad(){
      this.setState({publicidad: this.props.publicidad})
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
              <td>{this.props.publicidad.cliente}</td>
              <td>{moment(this.props.publicidad.fechaDeEntrada).format('DD-M-YYYY')}</td>
              <td>{moment(this.props.publicidad.fechaDeSalida).format('DD-M-YYYY')}</td>
              <td>{this.props.publicidad.cantidadPorDia}</td>
              <td>{this.props.publicidad.dias}</td>
              <td>{this.props.publicidad.horariosDeSalida}</td>
              <td>{this.props.publicidad.precio}</td>
              <td>{this.props.publicidad.pagado ? "Pagado" : "Adeuda" }  </td>
              <td><Button color="primary" onClick={() => this.props.selector(this.state.publicidad)}>
                <Link to={`publicidades/{publicidad._id}`}>{this.props.publicidad.nombre}
                Editar</Link></Button>
                  <Button color="danger" onClick={() => {
                    this.handleSubmit(this.props.publicidad._id);
                  }}>Borrar</Button></td>
                <Route path={"/publicidades/this.publididad._id"}  render={(props) => <PublicidadForm 
                                           publicidad={this.props.publicidad}
                                           {...props} />}
      />
          </tr>)
      
    }
    
}

  export default PublicidadRow