import React from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
var moment = require('moment');


class PresupuestadorExterno extends React.Component {

  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleDias = this.handleDias.bind(this);
      this.handleHorarios = this.handleHorarios.bind(this);
      this.recalcularPresupuesto = this.recalcularPresupuesto.bind(this);
      this.handlePresupuesto = this.handlePresupuesto.bind(this);
      
      this.state = {  
                      cantidadPorDia: 0,
                      precioCantidadPorDia: 0,
                      precioPorCantidadDeDias: 0,
                      porcentajeSemanal: 1,
                      selectedDias: [],
                      dias:[{name:'Lunes', id:1},{name:'Martes', id:2},{name:'Miercoles', id:3},{name:'Jueves', id:4},{name:'Viernes', id:5},{name:'Sabado', id:6}, {name: 'Domingo', id:7}],
                      selectedTimes: [],
                      horarios: [{name:'Madrugada', id:1}, {name:'Mañana', id:2}, {name: 'Mediodia', id:3}, {name: 'Tarde', id:4}, {name: 'Noche', id:5}],
                      presupuesto: '',
                      presupuestador: '',
                    }
    }

  componentWillMount(){
     this.presupuestador();
  }
  
  presupuestador(){
    fetch(`http://localhost:8888/presupuestador`)
      .then(res => res.json())
      .then(presupuestador => this. setState({presupuestador: presupuestador[0]}))
  }
  

  handleChange(event) {
    this.setState({[event.target.name]: event.target.name});
  }
  handleDias = selectedDias=> {this.setState({selectedDias}, this.recalcularPresupuesto )};
  handleHorarios = selectedTimes=> {this.setState({selectedTimes}, this.recalcularPresupuesto)};
      
  handlePresupuesto(event){
    this.setState({[event.target.name] : event.target.value}, this.recalcularPresupuesto, this.handleChange(event))
  }
  
  recalcularPresupuesto=()=>{
    this.calcularPrecioporVez();
    this.calcularPrecioPorDia();
    let total = this.state.precioPorCantidadDeDias + this.state.precioCantidadPorDia;
    console.log("total: ", total);
    total = total * (this.calcularPorcentajeSemanal() + this.calcularPorcentajePorHorario())
    
    this.setState({presupuesto: total})
    console.log("total: ", total)
  }

  calcularPrecioporVez=()=>{
    fetch(`http://localhost:8888/presupuestador/presupuestarVeces/`+this.state.cantidadPorDia)
      .then(res => res.json())
      .then(res => {
            console.log("response frontend: ", res);
            this.setState({precioCantidadPorDia: res})
          })
  }

  calcularPrecioPorDia=()=>{
    fetch(`http://localhost:8888/presupuestador/presupuestarDuracion/`+this.state.fechaDeSalida)
      .then(res => res.json())
      .then(res => {
            console.log("response frontend: ", res);
            this.setState({precioPorCantidadDeDias: res})
          })
  }

  calcularPorcentajeSemanal=()=>{
    
    var porcentajeEstimado = 1;
    var lunes = this.state.selectedDias.find(element => element.name === "Lunes");
    var martes = this.state.selectedDias.find(element => element.name === "Martes");
    var miercoles = this.state.selectedDias.find(element => element.name === "Miercoles");
    var jueves = this.state.selectedDias.find(element => element.name === "Jueves");
    var viernes = this.state.selectedDias.find(element => element.name === "Viernes");
    var sabado = this.state.selectedDias.find(element => element.name === "Sabado");
    var domingo = this.state.selectedDias.find(element => element.name === "Domingo");
    if (lunes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeLunes;
    }
    if (martes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeMartes;
    }
    if (miercoles !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeMiercoles;
    }
    if (jueves !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeJueves;
    }
    if (viernes !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeViernes;
    }
    if (sabado !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeSabado;
    }
    if (domingo !== undefined){
      porcentajeEstimado += this.state.presupuestador.porcentajeDomingo;
    }
    console.log("porcentaje estimado: ", porcentajeEstimado)
    return Math.round(porcentajeEstimado)
  }

  calcularPorcentajePorHorario=()=>{
    var porcentaje = 0;
    var madrugada = this.state.selectedTimes.find(element => element.name === "Madrugada");
    var mañana = this.state.selectedTimes.find(element => element.name === "Mañana");
    var mediodia = this.state.selectedTimes.find(element => element.name === "Mediodia");
    var tarde = this.state.selectedTimes.find(element => element.name === "Tarde");
    var noche = this.state.selectedTimes.find(element => element.name === "Noche");
    if (madrugada !== undefined){
      porcentaje += this.state.presupuestador.porcentajeLunes;
    }
    if (mañana !== undefined){
      porcentaje += this.state.presupuestador.porcentajeMartes;
    }
    if (mediodia !== undefined){
      porcentaje += this.state.presupuestador.porcentajeMiercoles;
    }
    if (tarde !== undefined){
      porcentaje += this.state.presupuestador.porcentajeJueves;
    }
    if (noche !== undefined){
      porcentaje += this.state.presupuestador.porcentajeViernes;
    }
    console.log("porcentaje: ", porcentaje)
    return porcentaje
  }

  render() {
    const {selectedDias} = this.state;
    const {selectedTimes} = this.state;

    return (
      <div className="container" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="fechaDeSalida">Fecha de salida</Label>
            <Input type="date" name="fechaDeSalida" className="date-picker" value={moment(this.state.fechaDeSalida).format('YYYY-MM-DD')} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup>
          <Label for="dias">Dias de la Semana</Label>
          <Multiselect
            options={this.state.dias} // Options to display in the dropdown
            selectedValues={selectedDias} // Preselected value to persist in dropdown
            onSelect={this.handleDias} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Seleccionar dias"
            />
          </FormGroup>
          <FormGroup>
          <Label for="horarios">Horarios de salida</Label>
          <Multiselect
            options={this.state.horarios} // Options to display in the dropdown
            selectedValues={selectedTimes} // Preselected value to persist in dropdown
            onSelect={this.handleHorarios} // Function will trigger on select event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Seleccionar horarios"
            />
          </FormGroup>
          <FormGroup>
            <Label for="cantidadPorDia">Veces por dia</Label>
            <Input type="text" name="cantidadPorDia" className="int-input" value={this.state.cantidadPorDia} onChange={this.handlePresupuesto} />
          </FormGroup>
          <FormGroup>
            <Label for="precio">Monto</Label>
            <Input type="text" name="precio" className="int-input" value={this.state.presupuesto} onChange={this.handleChange}/>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

  export default PresupuestadorExterno