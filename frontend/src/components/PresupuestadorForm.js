import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';



class PresupuestadorForm extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
                    presupuestador: "",
                    vezPorDia:''}
    }

    presupuestador(){
        fetch(`http://localhost:8888/presupuestos`)
          .then(res => res.json())
          .then(presupuestador => this. setState({presupuestador: presupuestador}))
      }

    componentWillReceiveProps(props) {
        this.setState({presupuestador: props.presupuestador})
    }

    componentWillMount(){
        this.presupuestador();
    }

    handleSubmit(event) {
        if (this.state.presupuestador._id) {
          this.editarPresupuestador();
        } else {
          this.agregarPresupuestador();
        }
        event.preventDefault();
      }
    
    handleChange(event) {
        var newPresupuestador = Object.assign({}, this.state.presupuestador);
        console.log('state', this.state);
        newPresupuestador[event.target.name] = event.target.value;
        this.setState({presupuestador: newPresupuestador});
      }

    agregarPresupuestador() {
    fetch(`http://localhost:8888/presupuestos`, {
        method: "POST",
        body: JSON.stringify(this.state.presupuestador),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        }
    });
    }

    editarPresupuestador() {
        fetch('http://localhost:8888/presupuestos', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain,*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.presupuestador)
        }).then(this.listado())
      }

    render(){
        return (
            <div className="container" >
                <Form onSubmit={this.handleSubmit}></Form>
                <FormGroup>
                    <Label for="vezPorDia">Precio Base por Dia</Label>
                    <input type="number" value={this.state.presupuestador.vezPorDia} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Precio Base por semana</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                 <FormGroup>
                    <Label for="preciopDia">Precio Base Por Mes</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcentaje por vez</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Lunes</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Martes</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Miercoles</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Jueves</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Viernes</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Sabado</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Domingo</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Madrugada</Label>
                    <input type="number" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Mediodia</Label>
                    <input type="number"  onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Tarde</Label>
                    <input type="number"  onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopDia">Porcenaje Noche</Label>
                    <input type="number"  onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submit" value="submit">Actualizar</Button>
            </div>
        )
    }

}

export default PresupuestadorForm