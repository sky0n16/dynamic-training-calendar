const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
dotenv.config();
router.use(bodyParser.json())
const Event = require('../models/event')

router.post('/', async (req, res) => {
    //console.log("webhook event received!", req.query, req.body);
    //console.log(req.body.object_id);
    //console.log(req.body.aspect_type)
    if(req.body.aspect_type == 'create'){
        activityID = req.body.object_id;
        data = await getData(activityID);
        activityComplete(data.type)

    }
    res.status(200).send('EVENT_RECEIVED');
});

  // Adds support for GET requests to our webhook
router.get('/', (req, res) => {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = "STRAVA";
    // Parses the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Verifies that the mode and token sent are valid
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {     
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.json({"hub.challenge":challenge});  
    } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
    }
    }
});

// data
async function activityComplete(dbField){
    if (await Event.exists({type: dbField})){
        const event = await Event.findOne(
            {type: dbField}
            );
        //console.log(await event)
        event.completed = true;
        //console.log(await event)
        await event.save()
    } else {
        console.log('No event with that type ignoring activity')
    }
    //await event.save()
    //console.log(event)
    //
    //res.json(updatedEvent)

}


async function getAccessToken(){

    const authLink = "https://www.strava.com/oauth/token"
    //console.log(authLink)
    let jsondata;
    const res = await fetch(authLink,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            refresh_token: process.env.refresh_token,
            grant_type: 'refresh_token'
        })
    });
    const body = await res.json();
    //console.log(body);
    return body;
    
};




function returnAccessToken(res){
    //console.log(res.access_token);
    return res.access_token;
}

async function getActivities(res, activity){ //pulls activity data from strava with an after time attribute to filet different days
    
    const activitiesLink = "https://www.strava.com/api/v3/activities/" + activity + "?access_token=" + returnAccessToken(res)
    const activities = await fetch(activitiesLink)
        .then(res => res.json())
    const data = await activities;
    return data;
}

function getActivityData(data){
    console.log(data.type);
    console.log(data.id)
    console.log(data.start_date);

}

async function getData(activity){
    const res = await getAccessToken();
    const json = await getActivities(res, activity)
    //console.log(json)
    getActivityData(json);
    return json;
}




module.exports = router;