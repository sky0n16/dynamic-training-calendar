// this is where the user will be able to create an events in the event db
// and adjust events database
const express = require('express')
const router = express.Router()
const Event = require('../models/event')

router.use(express.json())
//get all
router.get('/', async (req, res) => {
    try{
        const event = await Event.find()
        res.json(event)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event)
})

//creating one
router.post('/', async (req, res) =>{
    const event = new Event ({
        name: req.body.name,
        type: req.body.type,
        dueDate: req.body.dueDate,
        repeatDays: req.body.repeatDays
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err){
        res.status(400).json({ message: err.message })

    }
})
//update one
router.patch('/:id', getEvent, async (req, res) => {
    if (req.body.name != null) {
        res.event.name = req.body.name
    }
    if (req.body.type != null) {
        res.event.type = req.body.type
    }
    if (req.body.dueDate != null) {
        res.event.dueDate = req.body.dueDate
    }
    if (req.body.repeatDays != null) {
        res.event.repeatDays = req.body.repeatDays
    }
    if (req.body.completed != null) {//remove after testing
        res.event.completed = req.body.completed//remove
    }//remove
    try {
        const updatedEvent = await res.event.save()
        res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//delete one
router.delete('/:id', getEvent, async (req,res) => {
    try {
        await res.event.remove()
        res.json({ message: 'Deleted Event'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})


//middleware
async function getEvent(req, res, next) {
    let event
    try{
        event = await Event.findById(req.params.id)
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' })
        } 
    } catch(err){
        return res.status(500).json({message : err.message})
    }

    res.event = event
    next()
}

module.exports = router