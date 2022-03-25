const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

dotenv.config();

mongoose.connect(process.env.mongoose_url)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connection established'))

app.use(express.json())
const eventRouter = require('./routes/event')
app.use('/event', eventRouter)

app.listen(3000, () => console.log('Server started'))