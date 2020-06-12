import React from 'react';
import logo from './logo.png';
import Clientes from './components/Clientes'
import HomeComponent from './components/HomeComponent'
import PublicidadesList from './components/PublicidadesList'
import PublicidadForm from './components/PublicidadForm'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"
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

function App() {
  return (
    <div className="App">
    <Router>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/clientes">Clientes</NavLink></li>
          <li><NavLink to="/publicidades">publicidades</NavLink></li>
          <li><NavLink to="/nuevaPublicidad">Agregar Publicidad</NavLink></li>
        </ul>
      </header>
      <main className="App-main">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/clientes"  component={ClientesComponent} />
            <Route path="/publicidades" component={PublicidadesComponent} />
            <Route path="/nuevaPublicidad" component={PublicidadFormComponent} />
            <Redirect to="/" />
          </Switch>
      </main>
      </Router>
    </div>
  );
}

export default App;
