const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

dotenv.config();

mongoose.connect(process.env.mongoose_url)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connection established'))

const activityRouter = require('./routes/activity')
app.use('/activity', activityRouter)

app.listen(3001, () => console.log('Server started'))