const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();


var access_token;

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
    return
    
};

function returnAccessToken(res){
    return res.access_token;
}

function getActivities(res){
    
    const activitiesLink = "https://www.strava.com/api/v3/athlete/activities?access_token=" + returnAccessToken(res) + "&after=1645407308"
    fetch(activitiesLink)
    .then(res => res.json())
    .then(json => console.log(json));
}

async function main(){
    const res = await getAccessToken();
    getActivities(res);
}


main()



//console.log()
//getAccessToken()


//getActivities();