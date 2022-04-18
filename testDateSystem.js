repeatDays = "SuTuWThFSa"

function repeatDaysToDays (repeatDays){
    weekdayList = {"Su":0, "M":1, "Tu":2, "W":3, "Th":4, "F":5, "Sa":6}
    repeatList = []
    let day = 0
    for(let i = 0; i < repeatDays.length; i++){
        let dayChar
        if(repeatDays[i] == "T" || repeatDays[i] == "S"){
            dayChar = (repeatDays.charAt(i) + repeatDays.charAt(i + 1))
            i++
            //
        }else{
            dayChar = (repeatDays.charAt(i))
        }
        repeatList.push(weekdayList[dayChar])
    }
    return repeatList;    
}


function checkIfWorkoutDay(repeatList){
    d = new Date()
    currentWeekDay = d.getDay()
    workoutToday = false
    for(let i = 0; i < repeatList.length; i++){
        if(currentWeekDay == repeatList[i]){
            console.log
            workoutToday = true;
        } 
    }
    return workoutToday
}


console.log(checkIfWorkoutDay(repeatDaysToDays(repeatDays)))



