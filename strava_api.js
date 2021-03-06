const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');

dotenv.config();



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


async function main(activity){
    const res = await getAccessToken();
    const json = await getActivities(res, activity)
    //console.log(json)
    getActivityData(json);

}


main(6982243130)// get time frame from 11am - 3 am in epoch time



//console.log()
//getAccessToken()


//getActivities();

//.then(data => console.log(JSON.stringify(data)));