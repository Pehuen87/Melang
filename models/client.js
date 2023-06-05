const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
    name: { type: String, required: true},
    surname: { type: String, required: true},
    email: String,
    cuit: { type: Number, required: true},
    phone: String,
    address: String,
    city: String,
    state: String,
    debt: Number
})

const Client = model('Client', clientSchema)

module.exports = Client
