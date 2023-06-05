const { Schema, model } = require('mongoose')
const LISTSIZE = 4


const sellSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Client' },
    altClient: String,
    date: { type: Date, default: Date.now },
    total: {type: Number, default: 0},
    printed:{type: Boolean, default: false},
    updated: { type: Date, default: Date.now },
    condition: {type: String, enum: ['E','C','D'], default: 'E'},
    list: {type: Number, max: LISTSIZE, required: true},
    row : [{
        bill: {type: Schema.Types.ObjectId, ref: 'Bill'},
         }],
    errors: {type: Boolean, default: true}
})
 
const Sell = model('Sell', sellSchema)

module.exports = Sell
