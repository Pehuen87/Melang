const { Schema, model } = require('mongoose')
const LISTSIZE = 4
const historicSize = 10
const defaultPerc = 20


const productSchema = new Schema({
    name: { type: String, require: true },
    desc: { type: String, required: true },
    supplier: {type: Schema.Types.ObjectId, ref: 'Supplier' },
    brand: String,
    related: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cost: { type: Number, default: 0 },
    lastBuyCost: { type: Number, default: 0 },
    lastBuyDate: { type: Date, default: Date.now },
    lastBuySupplier:  {type: Schema.Types.ObjectId, ref: 'Supplier' },
    updated: { type: Date, default: Date.now },
    listPerc: { type: [Number], minLength: LISTSIZE, maxLength: LISTSIZE, default: Array(LISTSIZE).fill(defaultPerc) },
    category: { type: Number, ref: 'Category' },
    unit: {type: Number, default: 1},
    unitPerBulk: {type: Number, default: 1},
    historicCost: { type: [Number], maxLength: historicSize, default: []},
    enabled: {type: Boolean, default: true}
})

const Product = model('Product', productSchema)

module.exports = Product
