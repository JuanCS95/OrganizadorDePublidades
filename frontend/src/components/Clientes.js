import React from 'react';
import ClienteRow from './ClienteRow';
import ClienteForm from './ClienteForm';

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [], selected:{}}
    this.select = this.select.bind(this);
    this.listado = this.listado.bind(this)
    this.clienteChange = this.clienteChange.bind(this);
    this.actualizarListaDeObjetos=this.actualizarListaDeObjetos.bind(this);
  }

  componentWillMount() {
    this.listado();
  }

  listado(){
    fetch(`http://localhost:8888/clientes`)
      .then( res => res.json())
      .then( prds => this.setState({clientes: prds}));
  }

    render() {

      if( this.state.clientes.length > 0 ) {
        return(
          <div className="ClientesCSS">
              <h2>{this.props.titulo}</h2>
          <div className="ClientesCSS">
            <ClienteForm
              cliente={this.state.selected}
              clienteChange={this.clienteChange}
              listado ={this.listado}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                 <th>Agente Comercial</th>
                 <th>Agencia Comercial</th>
                 <th>Direccion</th>
                 <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>)
      }
      else {
        return(
          <div className="ClientesCSS">
              <h2>{this.props.titulo}</h2>
              CARGANDO
          </div>);  
      }

    }

    select(unCliente) {
      this.setState({selected:unCliente })
    }

    clienteChange(unCliente) {
      this.listado();
    }

    renderRows() {
      return this.state.clientes.map((unCliente, index) => {
        return (
          <ClienteRow 
          cliente={unCliente} 
          selector={this.select}
          actualizarListaDeObjetos={this.actualizarListaDeObjetos}
           />
        );
      })
    }
    
    actualizarListaDeObjetos(unCliente) {
      var clienteActualizado = this.state.clientes.filter(
        item => unCliente._id !== item._id
      );
      this.setState({ clientes: clienteActualizado });
    }
  }

  export default Clientes