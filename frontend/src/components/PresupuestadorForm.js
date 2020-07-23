import React from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';



class PresupuestadorForm extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {presupuestador: '',}
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
        fetch('http://localhost:8888/presupuestador', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain,*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.presupuestador)
        })
            
      }
    
    handleChange(event) {
        var newPresupuestador = Object.assign({}, this.state.presupuestador);
        console.log('state', this.state);
        console.log('value: ', event.target.value)
        newPresupuestador[event.target.name] = event.target.value;
        this.setState({presupuestador: newPresupuestador});
    }   

    render(){
        return (
            <div className="container" >
                <Form onSubmit={this.handleSubmit}></Form>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-text">
                                <Label for="precioPorDia">Precio Base por Dia</Label>    
                            </td>
                            <td>
                                $<input type="number" name="precioPorDia" className="int-input-large" value={this.state.presupuestador.precioPorDia} onChange={this.handleChange}/>        
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">
                                <Label for="preciopSemana">Precio Base por semana</Label>
                            </td>
                            <td>
                                $<input type="number" name="precioPorSemana" className="int-input-large" value={this.state.presupuestador.precioPorSemana} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="preciopMes">Precio Base Por Mes</Label>
                            </td>
                            <td>
                                $<input type="number" name="precioPorMes" className="int-input-large" value={this.state.presupuestador.precioPorMes} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="preciopVez">Porcentaje por vez</Label>
                            </td>
                            <td>
                                $<input type="number" name="vezPorDia" className="int-input-large" value={this.state.presupuestador.vezPorDia} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioLunes">Porcenaje Lunes</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeLunes" className="int-input-large" value={this.state.presupuestador.porcentajeLunes} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioMartes">Porcenaje Martes</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeMartes" className="int-input-large" value={this.state.presupuestador.porcentajeMartes} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioMiercoles">Porcenaje Miercoles</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeMiercoles" className="int-input-large" value={this.state.presupuestador.porcentajeMiercoles} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioJueves">Porcenaje Jueves</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeJueves" className="int-input-large" value={this.state.presupuestador.porcentajeJueves} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioViernes">Porcenaje Viernes</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeViernes" className="int-input-large" value={this.state.presupuestador.porcentajeViernes} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioSabado">Porcenaje Sabado</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeSabado" className="int-input-large" value={this.state.presupuestador.porcentajeSabado} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioDomingo">Porcenaje Domingo</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeDomingo" className="int-input-large" value={this.state.presupuestador.porcentajeDomingo} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioMadrugada">Porcenaje Madrugada</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeMadrugada" className="int-input-large" value={this.state.presupuestador.porcentajeMadrugada} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">   
                                <Label for="precioMediodia">Porcenaje Mediodia</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeMedioDia" className="int-input-large" value={this.state.presupuestador.porcentajeMedioDia} onChange={this.handleChange}/>
                            </td>     
                        </tr>
                        <tr>
                            <td className="table-text">
                                <Label for="precioTarde">Porcenaje Tarde</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeTarde" className="int-input-large" value={this.state.presupuestador.porcentajeTarde} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-text">
                                <Label for="precioNoche">Porcenaje Noche</Label>
                            </td>
                            <td>
                                $<input type="number" name="porcentajeNoche" className="int-input-large" value={this.state.presupuestador.porcentajeNoche} onChange={this.handleChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit" onClick= {this.handleSubmit} value="submit">Actualizar</Button>
            </div>
        )
    }

}

export default PresupuestadorForm