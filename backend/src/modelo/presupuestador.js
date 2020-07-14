// var Document = require('camo').Document;
class Presupuestador {
    constructor(pSemana, pMes, pDia, pVez, pLunes, pMartes, pMiercoles, pJueves, pViernes, pSabado, pDomingo, pMadrugada, pMediodia, pTarde, pNoche){
        // super();
        // if (Presupuestador.instance) {
        //     throw new Error("Singleton classes can't be instantiated more than once.")
        //   }
        // Presupuestador.instance = this;
        this.precioPorSemana = pSemana;
        this.precioPorMes = pMes;
        this.precioPorDia = pDia;
        this.vezPorDia = pVez;
        this.porcentajeLunes = pLunes;
        this.porcentajeMartes = pMartes;
        this.porcentajeMiercoles = pMiercoles;
        this.porcentajeJueves = pJueves;
        this.porcentajeViernes = pViernes;
        this.porcentajeSabado = pSabado;
        this.porcentajeDomingo = pDomingo;
        this.porcentajeMadrugada = pMadrugada;
        this.porcentajeMedioDia = pMediodia;
        this.porcentajeTarde = pTarde;
        this.porcentajeNoche = pNoche;
    }
calcularPrecioporVez(){return 2 * this.vezPorDia;}
calcularPrecioPorSemana(event){return event* this.precioPorSemana;}
calcularPrecioPorDia(event){return event * this.precioPorDia;}

}
// const instance = new Presupuestador();
// Object.freeze(instance);

// module.exports = instance;

module.exports = Presupuestador;