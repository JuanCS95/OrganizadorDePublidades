
class Presupuestador {
    constructor(pSemana, pMes, pDia, pVez, pLunes, pMartes, pMiercoles, pJueves, pViernes, pSabado, pDomingo, pMadrugada, pMediodia, pTarde, pNoche){
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
calcularPrecioporVez(veces){return veces * this.vezPorDia;}

calcularPrecioPorDuracion(fechaDeSalida){
    var fechaSalida = new Date(fechaDeSalida);
    console.log("fecha Salida: ", fechaSalida)
    
    var fechaEntrada = new Date();
    console.log("fecha Entrada: ", fechaEntrada)
    
    var dias = Math.round((fechaSalida - fechaEntrada)/ (1000 * 3600 * 24))
    console.log("cantidad de Dias", dias)
    
    var precioDias = dias * this.precioPorDia
    if(dias === "7"){
      precioDias = this.precioPorSemana
    } else if (dias === "30"){
      precioDias = this.precioPorMes
    }
    console.log("precio de dias seleccionados: ", precioDias)
    return precioDias;
}

calcularPorcentajeSemanal(selectedDias){
    var porcentajeEstimado = 1;
    console.log("dias seleccionados: ", selectedDias)
    var lunes = selectedDias.find(element => element.name === "Lunes");
    var martes = selectedDias.find(element => element.name === "Martes");
    var miercoles = selectedDias.find(element => element.name === "Miercoles");
    var jueves = selectedDias.find(element => element.name === "Jueves");
    var viernes = selectedDias.find(element => element.name === "Viernes");
    var sabado = selectedDias.find(element => element.name === "Sabado");
    var domingo = selectedDias.find(element => element.name === "Domingo");
    if (lunes !== undefined){
      porcentajeEstimado += this.porcentajeLunes;
    }
    if (martes !== undefined){
      porcentajeEstimado += this.porcentajeMartes;
    }
    if (miercoles !== undefined){
      porcentajeEstimado += this.porcentajeMiercoles;
    }
    if (jueves !== undefined){
      porcentajeEstimado += this.porcentajeJueves;
    }
    if (viernes !== undefined){
      porcentajeEstimado += this.porcentajeViernes;
    }
    if (sabado !== undefined){
      porcentajeEstimado += this.porcentajeSabado;
    }
    if (domingo !== undefined){
      porcentajeEstimado += this.porcentajeDomingo;
    }
    console.log("porcentaje estimado: ", porcentajeEstimado)
    return Math.round(porcentajeEstimado)
  }

}
// const instance = new Presupuestador();
// Object.freeze(instance);

// module.exports = instance;

module.exports = Presupuestador;