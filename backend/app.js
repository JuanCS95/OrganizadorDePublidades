server = require("./server")
publicidad = require ("./src/publicidad")
cliente = require("./src/cliente")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    publicidadHome = new Home("publicidades", db)
    clienteHome = new Home("clientes", db)
    Fede = new cliente("Federico", "Universidad de Quilmes", "Quilmes", "01102-029203")
    unqui = new publicidad(Fede, 2300, new Date(), "2020, 4, 28", 7)
    nahuel = new cliente("Nahuel", "Desarrolladores Nahuel", "Avenida Mitre", "2478-440213")
    devNahuel = new publicidad(nahuel, 2000, new Date(), "2020, 5, 3", 5)
    publicidadHome.insert(devNahuel)
    publicidadHome.insert(unqui)
    clienteHome.insert(Fede)
    clienteHome.insert(nahuel)
    server.register(publicidadHome)
    server.register(clienteHome)
    server.init();
})

