import React from 'react';

class PublicidadForm extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {publicidad:props.publicidad}
      }

      componentWillReceiveProps(props) {
          this.setState({publicidad: props.publicidad})
      }

      handleChange(event) {
        var newPublicidad = Object.assign({}, this.state.publicidad);
        newPublicidad[event.target.name] = event.target.value;
        this.setState({producto: newPublicidad});
      }

      handleSubmit(event) {

        fetch('http://localhost:8888/publicidades', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.publicidad)
        }).then(res => this.props.publicidadChange(this.state.publicidad))
          .catch(res => console.log("ERROR") );

        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={this.state.publicidad.nombre} onChange={this.handleChange}/>
            <label>Precio:</label>
            <input type="text" name="precio" value={this.state.publicidad.precio} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

  export default PublicidadForm