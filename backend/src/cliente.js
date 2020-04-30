class Cliente {

    constructor(agenteComercial, agenciaComercial, direccion, telefono) {
        this.agenteComercial = agenteComercial;
        this.agenciaComercial = agenciaComercial;
        this.direccion = direccion;
        this.telefono = telefono;
        this.deuda = 0;
    }
}

module.exports = Cliente;