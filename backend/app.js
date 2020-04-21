server = require("./server")
publicidad = require ("./src/publicidad")
cliente = require("./src/cliente")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    publicidadHome = new Home("publicidades", db)
    clienteHome = new Home("clientes", db)
    devNahuel = new publicidad("Desarrolladores Nahuel", 2000, new Date(), new Date())
    unqui = new publicidad("Universidad de Quilmes", 2300, new Date(), new Date())
    nahuel = new cliente("Nahuel", "Desarrolladores Nahuel", "Avenida Mitre", "2478-440213")
    publicidadHome.insert(devNahuel)
    publicidadHome.insert(unqui)
    clienteHome.insert(nahuel)
    server.register(publicidadHome)
    server.register(clienteHome)
    server.init();
})

