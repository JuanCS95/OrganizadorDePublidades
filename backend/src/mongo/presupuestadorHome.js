var mongoDriver= require('mongodb');
const Presupuestador = require('../modelo/presupuestador');


class PresupuestadorHome {

    constructor(type, db){
        this.type = type;
        this.presupuestador = db.collection("presupuestador");
    }

    insert(element) {
        this.presupuestador.insertOne(element, (error, result)=>{
            if(error) throw error
            console.log(`Result of insert one: ${JSON.stringify(result)}`)
        })
    }

    delete(elementId) {
        var objectId = mongoDriver.ObjectID(elementId);
        this.presupuestador.deleteOne({"_id" : objectId}, (error, result)=>{
            if(error) throw error
            console.log(`Result of delete one: ${JSON.stringify(result)}`)
        })    
    }

    get(elementId, callback) {
        var objectId = mongoDriver.ObjectID(elementId);
        return this.presupuestador.findOne({"_id" : objectId}, (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

    update(element) {
        var objectId = mongoDriver.ObjectID(element._id);
        element._id = objectId;
        this.presupuestador.replaceOne({"_id" : objectId}, element, (error, result)=>{
            if(error) throw error
            console.log(`Result of updateOne one: ${JSON.stringify(result)}`)
        })
    }

    all(callback) {
        this.presupuestador.find({}).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

    calcularPresupuestoPorVez(req, callback){
        this.presupuestador.find({}).toArray( (error, result) => {
            if(error) throw error
            var newPresupuestador = new Presupuestador(result[0].precioPorSemana, result[0].precioPorMes, result[0].precioPorDia, result[0].vezPorDia, result[0].porcentajeLunes, result[0].porcentajeMartes, result[0].porcentajeMiercoles, result[0].porcentajeJueves, result[0].porcentajeViernes, result[0].porcentajeSabado, result[0].porcentajeDomingo, result[0].porcentajeMadrugada, result[0].porcentajeMedioDia, result[0].porcentajeTarde, result[0].porcentajeNoche)
            var precioPorVez = newPresupuestador.calcularPrecioporVez(req)
            callback (precioPorVez);
        })
    }

    calcularPresupuestoPorDuracion(req, callback){
        this.presupuestador.find({}).toArray( (error, result) => {
            if(error) throw error
            var newPresupuestador = new Presupuestador(result[0].precioPorSemana, result[0].precioPorMes, result[0].precioPorDia, result[0].vezPorDia, result[0].porcentajeLunes, result[0].porcentajeMartes, result[0].porcentajeMiercoles, result[0].porcentajeJueves, result[0].porcentajeViernes, result[0].porcentajeSabado, result[0].porcentajeDomingo, result[0].porcentajeMadrugada, result[0].porcentajeMedioDia, result[0].porcentajeTarde, result[0].porcentajeNoche)
            var precioPorDuracion = newPresupuestador.calcularPrecioPorDuracion(req)
            callback(precioPorDuracion)
            })
    }

    calcularPresupuestoSemanal(req, callback){
        this.presupuestador.find({}).toArray( (error, result) => {
            if(error) throw error
            var newPresupuestador = new Presupuestador(result[0].precioPorSemana, result[0].precioPorMes, result[0].precioPorDia, result[0].vezPorDia, result[0].porcentajeLunes, result[0].porcentajeMartes, result[0].porcentajeMiercoles, result[0].porcentajeJueves, result[0].porcentajeViernes, result[0].porcentajeSabado, result[0].porcentajeDomingo, result[0].porcentajeMadrugada, result[0].porcentajeMedioDia, result[0].porcentajeTarde, result[0].porcentajeNoche)
            var porcentajeSemanal = newPresupuestador.calcularPorcentajeSemanal(req)
            callback(porcentajeSemanal)
            })
    }
}
module.exports = PresupuestadorHome;