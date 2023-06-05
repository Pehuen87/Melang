const { Schema, model } = require('mongoose')
const LISTSIZE = 4


const billSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Client' },
    altClient: String,
    date: { type: Date, default: Date.now },
    total: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    printed:{type: Boolean, default: false},
    type: {type: String, enum: ['A','B','C','N','P'], required: true},
    related: [{ type: Schema.Types.ObjectId, ref: 'Bill' }],
    updated: { type: Date, default: Date.now },
    list: {type: Number, max: LISTSIZE, required: true},
    row : [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String, 
        cost : {type: Number, default: 0},
        unit: {type: Number, default: 1},
        quantity: {type: Number, default: 1}
         }],
    errors: {type: Boolean, default: true}
})
 
const Bill = model('Bill', billSchema)

module.exports = Bill
