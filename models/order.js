const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Supplier' },
    date: { type: Date, default: Date.now },
    total: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    draft :{type: Boolean, default: false},
    updated: { type: Date, default: Date.now },
    row : [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        name: String, 
        cost : {type: Number, default: 0},
        unit: {type: Number, default: 1},
        unitPerBulk: {type: Number, default: 1},
        quantity: {type: Number, default: 1}
         }],
})
 
const Order = model('Order', orderSchema)

module.exports = Order
