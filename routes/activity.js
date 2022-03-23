const express = require('express')
const router = express.Router()
const Activity = require('../models/activity')

// activity need to be able to show data from the database
// the database will be updated from the strava api and 



//get all
router.get('/', async (req, res) => {
    try{
        const activity = await Activity.find()
        res.json(activity)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', async (req, res) => {
    res.send(req.params.id)
})


module.exports = router

