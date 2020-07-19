server = require("./server")
publicidad = require ("./src/modelo/publicidad")
cliente = require("./src/modelo/cliente")
presupuestador = require("./src/modelo/presupuestador")
presupuestadorHome = require("./src/mongo/presupuestadorHome")
mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    publicidadHome = new Home("publicidades", db)
    clienteHome = new Home("clientes", db)
    presupuestadorHome = new presupuestadorHome("presupuestador",db)    
    presupuestadorRadio = new presupuestador(250, 500, 20, 10, 0.25, 0.25, 0.5, 0.5, 0.6, 0.6, 1, 0.3, 0.25, 0.25, 0.15)
    
    Fede = new cliente("Federico", "Universidad de Quilmes", "Quilmes", "01102-029203")
    unqui = new publicidad(Fede.agenciaComercial, 1300, new Date(), new Date(2020,07,28), 7 )
    unqui.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    unqui.horariosDeSalida = ["Madrugada", "Tarde"]
    nahuel = new cliente("Nahuel", "Desarrolladores Nahuel", "Avenida Mitre", "2478-440213")
    devNahuel = new publicidad(nahuel.agenciaComercial, 1000, new Date(), new Date(2020,07,25), 5)
    devNahuel.dias = ["Lunes", "Martes", "Jueves", "Viernes"]
    devNahuel.horariosDeSalida = ["Madrugada", "Noche"]
    presupuestadorHome.insert(presupuestadorRadio)
    publicidadHome.insert(devNahuel)
    publicidadHome.insert(unqui)
    clienteHome.insert(Fede)
    clienteHome.insert(nahuel)
    server.register(publicidadHome)
    server.register(clienteHome)
    server.register(presupuestadorHome)
    server.init();
})

