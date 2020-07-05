server = require("./server")
publicidad = require ("./src/modelo/publicidad")
cliente = require("./src/modelo/cliente")
presupuestador = require("./src/modelo/presupuestador")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    publicidadHome = new Home("publicidades", db)
    clienteHome = new Home("clientes", db)
    presupuestadorHome = new Home("presupuestos",db)
    presupuesto = new presupuestador(500, 1000, 100, 50)
    Fede = new cliente("Federico", "Universidad de Quilmes", "Quilmes", "01102-029203")
    unqui = new publicidad(Fede, 2300, new Date(), new Date(2020,05,28), 7 )
    unqui.dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    unqui.horariosDeSalida = ["Madrugada", "Tarde"]
    nahuel = new cliente("Nahuel", "Desarrolladores Nahuel", "Avenida Mitre", "2478-440213")
    devNahuel = new publicidad(nahuel, 2000, new Date(), new Date(2020,05,25), 5)
    devNahuel.dias = ["Lunes", "Martes", "Jueves", "Viernes"]
    devNahuel.horariosDeSalida = ["Madrugada", "Noche"]
    presupuestadorHome.insert(presupuesto)
    publicidadHome.insert(devNahuel)
    publicidadHome.insert(unqui)
    clienteHome.insert(Fede)
    clienteHome.insert(nahuel)
    server.register(publicidadHome)
    server.register(clienteHome)
    server.register(presupuestadorHome)
    server.init();
})

