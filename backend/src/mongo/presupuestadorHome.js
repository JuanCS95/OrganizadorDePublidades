var mongoDriver= require('mongodb');


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

    calcularPresupuesto(req, callback){
        this.presupuestador.find({}).toArray( (error, result) => {
            if(error) throw error
            var presupuesto = this.calcularPrecioPorVez(req, result[0])
            callback(presupuesto)
        })
    }

    calcularPrecioPorVez(veces, presupuestador){
        return veces * presupuestador.vezPorDia
    }

}
module.exports = PresupuestadorHome;