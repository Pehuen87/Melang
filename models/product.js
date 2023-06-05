const { Schema, model } = require('mongoose')


const productSchema = new Schema({
    name: { type: String, required: true},
    desc: { type: String, required: true},
    supplier: {type: Schema.Types.ObjectId, ref: 'Supplier' },
    brand: String,
    related: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cost: { type: Number, default: 0 },
    lastBuyCost: { type: Number, default: 0 },
    lastBuyDate: { type: Date, default: Date.now },
    lastBuySupplier:  {type: Schema.Types.ObjectId, ref: 'Supplier' },
    updated: { type: Date, default: Date.now },
    listPerc: { type: [Number], minLength: process.env.LIST_SIZE, maxLength: process.env.LIST_SIZE, default: Array(process.env.LIST_SIZE).fill(process.env.DEFAULT_PERC) },
    category: { type: Number, ref: 'Category' },
    unit: {type: Number, default: 1},
    unitPerBulk: {type: Number, default: 1},
    historicCost: { type: [Number], maxLength: process.env.HISTORIC_SIZE, default: []},
    enabled: {type: Boolean, default: true}
})

const Product = model('Product', productSchema)

module.exports = Product
