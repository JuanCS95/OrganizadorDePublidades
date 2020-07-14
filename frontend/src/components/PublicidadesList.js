import React from 'react';
import PublicidadRow from './PublicidadRow'
import { Table} from 'reactstrap'


  class PublicidadesList extends React.Component {

    constructor(props) {
      super(props);
      this.state= { publicidades: [],selected:{}}
      this.selector = this.selector.bind(this);
      this.listado =this.listado.bind(this);
      this.publicidadChange=this.publicidadChange.bind(this);
      this.actualizarListaDeObjetos=this.actualizarListaDeObjetos.bind(this);
    }

    componentWillMount() {
      this.listado();
    }

    render() {
      if(this.state.publicidades.length > 0) {
      return (
        <div className="objetosPerdidosCSS">
          {/* <PublicidadForm
            publicidad={this.state.selected}
            publicidadChange={this.publicidadChange}
            listado ={this.listado}
            listadoClientes={this.listadoClientes}
          /> */}
          
          <Table className="table" striped>
            <thead>
              <tr>
                <th>Agencia</th>
                <th>Fecha de entrada</th>
                <th>Fecha de salida</th>
                <th>Salidas p/ dia</th>
                <th>Dias de Salida</th>
                <th>Horarios de Salida</th>
                <th>Precio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </Table>
         </div>
      );
    }
    else {
      return (
      <p>Cargando {this.props.entity} </p>);
    }
    }

    renderHeaders(columns) {
      return columns.map((col, index) => {
        return (
            <th>{col}</th>
        );
      })
    }

    renderRows() {
      return this.state.publicidades.map((unaPublicidad, index) => {
        return (
          <PublicidadRow
           publicidad={unaPublicidad}
           selector={this.selector} 
           actualizarListaDeObjetos={this.actualizarListaDeObjetos}
           />
        );
      })
    }
    selector(unaPublicidad){
      this.setState({selected:unaPublicidad})
    }
    publicidadChange(unaPublicidad) {
      this.listado();
    }
    
    listado(){
      fetch(`http://localhost:8888/publicidades`)
        .then( res => res.json())
        .then( prds => this.setState({publicidades: prds}));
    }

    actualizarListaDeObjetos(unaPublicidad) {
      var publicidadActualizada = this.state.publicidades.filter(
        item => unaPublicidad._id !== item._id
      );
      this.setState({ publicidades: publicidadActualizada });
    }
  }

export default PublicidadesList