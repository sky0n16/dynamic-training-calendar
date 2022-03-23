const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    }


})

module.exports = mongoose.model('Activity', activitySchema)