import React from 'react';
import PublicidadRow from './PublicidadRow';
import PublicidadForm from './PublicidadForm';

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { publicidades: [], selected:{}}
    this.select = this.select.bind(this);
    this.publicidadChange = this.publicidadChange.bind(this);
    this.actualizarListaDeObjetos=this.actualizarListaDeObjetos.bind(this);
  }

  componentWillMount() {
    fetch(`http://localhost:8888/publicidades`)
      .then( res => res.json())
      .then( prds => this.setState({publicidades: prds}));
  }

    render() {

      if( this.state.publicidades.length > 0 ) {
        return(
          <div className="productosCSS">
              <h2>{this.props.titulo}</h2>
          
          <table className="table">
            <thead>
              <tr>
                 <th>nombre</th>
                 <th>precio</th>
                 <th>Fecha de entrada</th>
                 <th>Fecha de salida</th>  
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          <PublicidadForm 
            publicidad={this.state.selected} 
            publicidadChange={this.publicidadChange} />
        </div>)
      }
      else {
        return(
          <div className="productosCSS">
              <h2>{this.props.titulo}</h2>
              CARGANDO
          </div>);  
      }

    }

    select(unaPublicidad) {
      this.setState({selected:unaPublicidad })
    }

    publicidadChange(unaPublicidad) {
      var newPublicidades = this.state.publicidades.map((item) => (unaPublicidad._id != item._id) ? item : unaPublicidad )
      this.setState({publicidades: newPublicidades, selected:unaPublicidad})
    }

    renderRows() {
      return this.state.publicidades.map((unaPublicidad, index) => {
        return (
          <PublicidadRow 
          publicidad={unaPublicidad} 
          selector={this.select}
          actualizarListaDeObjetos={this.actualizarListaDeObjetos}
           />
        );
      })
    }
    
    actualizarListaDeObjetos(unaPublicidad) {
      var publicidadActualizada = this.state.publicidades.filter(
        item => unaPublicidad._id !== item._id && unaPublicidad.archivado === false
      );
      this.setState({ publicidades: publicidadActualizada });
    }
  }

  export default Productos