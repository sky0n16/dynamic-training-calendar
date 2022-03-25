const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    repeatDays:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Event', eventSchema)