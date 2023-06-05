const { Schema, model } = require('mongoose')
const LISTSIZE = 4
const defaultPerc = 20


const productSchema = new Schema({
    name: { type: String, require: true },
    desc: { type: String, required: true },
    supplier: String,
    related: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cost: { type: Number, default: 0 },
    lastBuyCost: { type: Number, default: 0 },
    lastBuyDate: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    listPerc: { type: [Number], minLength: LISTSIZE, maxLength: LISTSIZE, default: Array(LISTSIZE).fill(defaultPerc) },
    category: { type: Number, ref: 'Category' }
})

const Product = model('Product', productSchema)

module.exports = Product
