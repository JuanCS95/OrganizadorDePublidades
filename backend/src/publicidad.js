class Publicidad {

    constructor(cliente, precio, fechaEntrada, fechaSalida, cantDia) {
        this.cliente = cliente;
        this.precio = precio;
        this.fechaDeEntrada = fechaEntrada;
        this.fechaDeSalida = fechaSalida;
        this.cantidadPorDia = cantDia;
        this.pagado = false;
    }
}

module.exports = Publicidad;