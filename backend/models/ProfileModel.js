// db table
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    bloodline: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Profile', profileSchema)