const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'SIMPLE_USER' },
    enabled: {type: Boolean, default: true}
})

const User = model('User', userSchema)

module.exports = User
