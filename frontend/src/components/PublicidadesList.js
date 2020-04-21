import React from 'react';
import ProductoForm from './ProductoForm'
import ProductoRow from './ProductoRow'
import { Table } from 'reactstrap';

  class PublicidadesList extends React.Component {

    constructor(props) {
      super(props);
      this.state= { publicidades: [],selected:{}}
      this.select = this.select.bind(this);
      this.listado =this.listado.bind(this);
      this.objetoPerdidoChange=this.objetoPerdidoChange.bind(this);
      this.actualizarListaDeObjetos=this.actualizarListaDeObjetos.bind(this);
    }

    componentWillMount() {
      this.listado();
    }

    render() {
      if(this.state.publicidades.length > 0) {
      return (
        <div className="objetosPerdidosCSS">
          <h2>Publicidades</h2>
          <ProductoForm
            publicidad={this.state.selected}
            publicidadChange={this.publicidadChange}
            listado ={this.listado}
          />
          
          <Table className="table" striped>
            <thead>
              <tr>
                <th>Agencia</th>
                <th>Precio</th>
                <th>Fecha de Entrada</th>
                <th>Fecha de Salida</th>
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
      return (<p> Cargando {this.props.entity} </p>);
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
          <ProductoRow
           publicidad={unaPublicidad}
           selector={this.select} 
           actualizarListaDeObjetos={this.actualizarListaDeObjetos}
           />
        );
      })
    }
    select(unaPublicidad){
      this.setState({selected:unaPublicidad})
    }
    objetoPerdidoChange(unaPublicidad) {
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