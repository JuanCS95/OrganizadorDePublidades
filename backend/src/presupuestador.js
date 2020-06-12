
class presupuestador {

    constructor(precioSemana,precioMes, precioDia,vezDia){
        this.precioPorSemana = precioSemana;
        this.precioPorMes = precioMes;
        this.precioBaseporDia = precioDia;
        this.vezPorDia = vezDia;
        this.porcentajeLunes = 2
        this.porcentajeMartes = 2
        this.porcentajeMiercoles = 2
        this.porcentajeJueves = 1
        this.porcentajeViernes = 1
        this.porcentajeSabado = 1
        this.porcentajeDomingo = 3
        this.porcentajeMadrugada = 0.7
        this.porcentajeMedioDia = 0.6
        this.porcentajeTarde = 0.5
        this.porcentajeNoche = 0.5
    }
}

module.exports = presupuestador;