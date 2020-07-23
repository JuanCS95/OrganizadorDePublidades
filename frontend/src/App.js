import React from 'react';
import logo from './logo.png';
import Clientes from './components/Clientes'
import HomeComponent from './components/HomeComponent'
import PublicidadesList from './components/PublicidadesList'
import PublicidadForm from './components/PublicidadForm'
import PresupuestadorForm from "./components/PresupuestadorForm"
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
import PresupuestadorExterno from './components/PresupuestadorExterno';
import './App.css';

function ClientesComponent() {
  return (<Clientes entity="clientes"/>)
}

function PublicidadesComponent()  {
  return (<PublicidadesList entity="publicidades"/>)
}

function PublicidadFormComponent()  {
  return (<PublicidadForm entity="publicidad"/>)
}
function presupuestadorComponent(){
  return (<PresupuestadorForm entity="presupuestador"/>)
}
function presupuestadorExternoComponent(){
  return (<PresupuestadorExterno entity="presupuestadorExterno"/>)
}


function App() {
  return (
    <div className="App">
    <Router>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <ul className="main-menu">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/clientes">Clientes</NavLink></li>
          <li><NavLink to="/publicidades">Publicidades</NavLink></li>
          <li><NavLink to="/nuevaPublicidad">Agregar Publicidad</NavLink></li>
          <li><NavLink to="/presupuestadorForm"> Configurar Presupuestador</NavLink></li>
          <li><NavLink to="/presupuestadorExterno">Calcular Presupuesto</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/clientes"  component={ClientesComponent} />
            <Route path="/publicidades" component={PublicidadesComponent} />
            <Route path="/nuevaPublicidad" component={PublicidadFormComponent} />
            <Route path="/presupuestadorForm" component={presupuestadorComponent}/>
            <Route path="/presupuestadorExterno" component={presupuestadorExternoComponent}/>
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
