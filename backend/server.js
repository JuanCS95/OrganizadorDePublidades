express = require("express");
bodyParser = require("body-parser");
PresupuestadorHome = require("./src/mongo/presupuestadorHome");
mongoHome = require('./src/mongo/mongoHome');
Presupuestador = require("./src/modelo/presupuestador")
var cors = require('cors');


var homes = {}

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
  
  server.get("/presupuestador/presupuestarVeces/:cantidadPorDia", (req, res) => {
    console.log("estoy presupuestando")
    home = homes["presupuestador"]
    vecesPorDia = req.params.cantidadPorDia
    console.log("req: ", vecesPorDia)
    home.calcularPresupuestoPorVez(vecesPorDia,(allObjects) => {
        console.log("allObjects: ", allObjects)
        res.json(allObjects)
        res.end() })
    console.log("res backend: " + res)
  })

  server.get("/presupuestador/presupuestarDuracion/:fechaDeSalida", (req, res) => {
    home = homes["presupuestador"]
    fechaSalida = req.params.fechaDeSalida
    console.log("req: ", fechaSalida)
    home.calcularPresupuestoPorDuracion(fechaSalida,(allObjects) => {
        res.json(allObjects)
        res.end() })
  })

  server.get("/presupuestador/presupuestarPorcentajeSemanal/:diasDeLaSemana", (req, res) => {
    home = homes["presupuestador"]
    DiasSeleccionados = req.params.diasDeLaSemana
    console.log("req: ", diasSeleccionados)
    home.calcularPresupuestoSemanal(diasSeleccionados,(allObjects) => {
        res.json(allObjects)
        res.end() })
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
