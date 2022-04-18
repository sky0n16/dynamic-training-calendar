const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

dotenv.config();

mongoose.connect(process.env.mongoose_url)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connection established'))

//app.use()
//const eventRouter = require('./routes/event')
app.use('/event', require('./routes/event'))
app.use('/webhook', require('./routes/webhook'))


app.listen(3000, () => console.log('Server started'))

app.listen(6969, () => console.log('webhook is listening 55339'));