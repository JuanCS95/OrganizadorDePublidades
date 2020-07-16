import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';



class PresupuestadorForm extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
                    presupuestador: '',
                    vezPorDia:''}
    }

    presupuestador(){
        fetch(`http://localhost:8888/presupuestador`)
          .then(res => res.json())
          .then(presupuestador => this. setState({presupuestador: presupuestador[0]}))
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
    fetch(`http://localhost:8888/presupuestador`, {
        method: "POST",
        body: JSON.stringify(this.state.presupuestador),
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        }
    });
    }

    editarPresupuestador() {
        fetch('http://localhost:8888/presupuestador', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain,*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.presupuestador)
        })
      }

    render(){
        return (
            <div className="container" >
                <Form onSubmit={this.handleSubmit}></Form>
                <FormGroup>
                    <Label for="precioPorDia">Precio Base por Dia</Label>
                    <input type="number" name="precioPorDia" value={this.state.presupuestador.precioPorDia} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopSemana">Precio Base por semana</Label>
                    <input type="number" name="precioPorSemana" value={this.state.presupuestador.precioPorSemana} onChange={this.handleChange}/>
                </FormGroup>
                 <FormGroup>
                    <Label for="preciopMes">Precio Base Por Mes</Label>
                    <input type="number" name="precioPorSemana" value={this.state.presupuestador.precioPorMes} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="preciopVez">Porcentaje por vez</Label>
                    <input type="number" name="vezPorDia" value={this.state.presupuestador.vezPorDia} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioLunes">Porcenaje Lunes</Label>
                    <input type="number" name="porcentajeLunes" value={this.state.presupuestador.porcentajeLunes} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioMartes">Porcenaje Martes</Label>
                    <input type="number" name="porcentajeMartes" value={this.state.presupuestador.porcentajeMartes} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioMiercoles">Porcenaje Miercoles</Label>
                    <input type="number" name="porcentajeMiercoles" value={this.state.presupuestador.porcentajeMiercoles} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioJueves">Porcenaje Jueves</Label>
                    <input type="number" name="porcentajeJueves" value={this.state.presupuestador.porcentajeJueves} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioViernes">Porcenaje Viernes</Label>
                    <input type="number" name="porcentajeViernes" value={this.state.presupuestador.porcentajeViernes} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioSabado">Porcenaje Sabado</Label>
                    <input type="number" name="porcentajeSabado" value={this.state.presupuestador.porcentajeSabado} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioDomingo">Porcenaje Domingo</Label>
                    <input type="number" name="porcentajeDomingo" value={this.state.presupuestador.porcentajeDomingo} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioMadrugada">Porcenaje Madrugada</Label>
                    <input type="number" name="porcentajeMadrugada" value={this.state.presupuestador.porcentajeMadrugada} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioMediodia">Porcenaje Mediodia</Label>
                    <input type="number" name="porcentajeMedioDia" value={this.state.presupuestador.porcentajeMedioDia} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioTarde">Porcenaje Tarde</Label>
                    <input type="number" name="porcentajeTarde" value={this.state.presupuestador.porcentajeTarde} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="precioNoche">Porcenaje Noche</Label>
                    <input type="number" name="porcentajeNoche" value={this.state.presupuestador.porcentajeNoche} onChange={this.handleChange}/>
                </FormGroup>
                <Button type="submit" value="submit">Actualizar</Button>
            </div>
        )
    }

}

export default PresupuestadorForm