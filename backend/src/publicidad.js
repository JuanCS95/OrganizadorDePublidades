class Publicidad {

    constructor(cliente, precio, fechaEntrada, fechaSalida, cantDia, horarios, dias) {
        this.cliente = cliente;
        this.precio = precio;
        this.fechaDeEntrada = fechaEntrada;
        this.fechaDeSalida = fechaSalida;
        this.cantidadPorDia = cantDia;
        this.pagado = false;
        this.tiemposDeSalida = horarios;
        this.dias = dias;
    }
}

module.exports = Publicidad;