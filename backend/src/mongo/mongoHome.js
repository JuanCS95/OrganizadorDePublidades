var mongoDriver = require('mongodb');

class MongoDBHome {

    constructor(type, db) {
        this.type = type
        this.persistentCollection = db.collection(type)
    }

    insert(element) {
        this.persistentCollection.insertOne(element, (error, result)=>{
            if(error) throw error
            console.log(`Result of insert one: ${JSON.stringify(result)}`)
        })
    }

    agregarCliente(publicidadId, cliente, callback) {
        var objectId = mongoDriver.ObjectID(publicidadId)
        this.publicidades.findOne({"_id":objectId})( (error, publicidad)=>{
            if(error)
                callback("error")
            else {
                publicidad.cliente.push(cliente)
                this.publicidad.replaceOne({"_id":objectId}, publicidad, (error, result)=>{
                    if(error)
                        callback("error")
                    else {
                        console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
                        callback("ok", publicidad)
                    }
                })
            }
        })
    }

    delete(elementId) {
        var objectId = mongoDriver.ObjectID(elementId);
        this.persistentCollection.deleteOne({"_id" : objectId}, (error, result)=>{
            if(error) throw error
            console.log(`Result of delete one: ${JSON.stringify(result)}`)
        })    
    }

    get(elementId, callback) {
        var objectId = mongoDriver.ObjectID(elementId);
        return this.persistentCollection.findOne({"_id" : objectId}, (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

    update(element) {
        var objectId = mongoDriver.ObjectID(element._id);
        element._id = objectId;
        this.persistentCollection.replaceOne({"_id" : objectId}, element, (error, result)=>{
            if(error) throw error
            console.log(`Result of updateOne one: ${JSON.stringify(result)}`)
        })
    }

    all(callback) {
        this.persistentCollection.find({}).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

}

module.exports = MongoDBHome