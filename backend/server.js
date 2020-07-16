express = require("express");
bodyParser = require("body-parser");
PresupuestadorHome = require("./src/mongo/presupuestadorHome");
mongoHome = require('./src/mongo/mongoHome');
Presupuestador = require("./src/modelo/presupuestador")
var cors = require('cors');

var connect = require('camo').connect;

var db

var database;
var uri = 'mongodb://localhost:27017/radio';
connect(uri).then(function(db) {
    database = db;
});



var homes = {}

// presupuestadorRadio = Presupuestador.create({
//       precioPorSemana:500,
//       precioPorMes: 1000, 
//       precioPorDia: 100, 
//       vezPorDia: 50, 
//       porcentajeLunes: 2,
//       porcentajeMartes: 1,
//       porcentajeMiercoles: 1,
//       porcentajeJueves: 1,
//       porcentajeViernes: 1,
//       porcentajeSabado: 2,
//       porcentajeDomingo: 3,
//       porcentajeMadrugada: 0.5, 
//       porcentajeMedioDia: 0.2, 
//       porcentajeTarde: 0.1, 
//       porcentajeNoche: 0.1})
//   presupuestadorRadio.save().then(function(l) {
//       console.log(l._id);
//   });

function register(home) {
  console.log(`registering handlers for ${home.type}`)
  homes[home.type] = home 
}

function init() {
  var server = express();
  server.use(bodyParser.json());
  
  server.use(cors());

  
  
  server.use("(/:type/*)|(/:type)", (req, res, next) => {
    if (!homes[req.params.type]) {
      console.log(` home de ${req.params.type} no existe`  )
      res.status(404).end()
    }
    else {
      console.log(` home de ${req.params.type} si existe `  )
      next()
    }
  })
  
  server.get("/presupuestador/presupuestarVeces", (req, res) => {
    console.log("estoy presupuestando")
    home = homes["presupuestador"]
    home.calcularPresupuesto((req, allObjects) => {
        console.log(allObjects)
        res.json(allObjects)
        res.end() })
    console.log("res" + res)
      })

  server.post("/publicidades/:id", (req, res) => {
    publicidadHome = new mongoHome(db)
    publicidadId = req.params.id
    tx = req.body
    publicidadHome.agregarCliente(publicidadId, cliente, (result, publicidad) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(publicidad);
      }
    }) 
  })

  server.get("/:type", (req, res) => {
    home = homes[req.params.type]
    home.all((allObjects) => {
        res.json(allObjects) 
        res.end() })       
  })


  server.get("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.get(req.params.id, (myObject) => { 
      res.json(myObject) 
      res.end() })  
  })

  server.put("/:type", (req, res) => {
    home = homes[req.params.type]
    home.update(req.body)
    res.status(204).end();  
  })

  server.post("/:type", (req, res) => {
    home = homes[req.params.type]
    home.insert(req.body)
    res.status(204).end();  
  })

  server.delete("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.delete(req.params.id)
    res.status(204).end();  
  });

  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
exports.register = register;
