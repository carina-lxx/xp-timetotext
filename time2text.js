'use strict'
function checkStage(hour) {
    let stage;
   
    if(hour>=0 && hour <=11) {
        stage = 'in the morning';
    };
    if(hour>=12 && hour<18) {
        stage = 'in the afternoon';
    }
    if(hour>=18 && hour<=23) {
        stage = 'in the evening';
    }
    return stage;
}

function convertHr(hour) {
    hour = hour % 12;
    return hourDict[hour];
}


//input is int, not multiple of five
function convertMin(minute) {
    const underTwenty = {1: "one", 2: "two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven", 8:"eight", 9:"nine", 
    11: "eleven", 12:"twelve", 13:"thirteen", 14:"fourteen", 16:"sixteen", 17:"seventeen", 18:"eighteen", 19:"nineteen"}
    const twentyToFifty = {2: "twenty-", 3:"thirty-", 4:"fourty-", 5:"fifty-"}; 
    let convertedText = '';

    if (minute < 10) {
        convertedText = 'oh ' + `${underTwenty[minute]}`;
    } else if (minute < 20) {
        convertedText = `${underTwenty[minute]}`;
    } else {
        let tens = parseInt(minute / 10);
        let digit = minute % 10;
        convertedText = `${twentyToFifty[tens]}` + `${underTwenty[digit]}`
    }
    return convertedText;
}

//boolean function to tell if minutes is multiple of five
function isMul(minute) {
    const minuteSet = new Set([5, 10, 15, 20, 30, 40, 45, 50, 55]);
    return minuteSet.has(minute);
}

//input is multiple of five(5, 10, 15, 20, 30, 40, 45, 50, 55)
// calMinutes() num past/[to] + hr[+1] + stage
function calMinutes(minute){
    const minDict = {0:"half",20:"ten", 25:"five", 15:"quarter", 10:"twenty"}
    let absMinute = Math.abs(minute - 30)
    return minDict[absMinute];
}

//boolean function to tell if current time is o'clock
function isOclock(minute) {
    return minute === 0;
}


const hourDict = {0:"twelve", 1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven", 8:"eight", 9:"nine", 10:"ten", 11:"eleven"}
function time2text (time) {

    let res = '';
    if(time === '00:00' || time === "24:00") {
        return 'midnight';
    };
    if(time === '12:00') {
        return 'noon';
    };

    let hr = parseInt(time.slice(0, 2));
    let min = parseInt(time.slice(3, 5));
    let stage = checkStage(hr);

    if(isOclock(min)) {
        stage = checkStage(hr);
        res = convertHr(hr) + " o'clock " + stage;
        return res;
    }

    if (isMul(min)) {
        let hourText = "";
        if (min <= 30) {
            
            if(hr === 0) {
                hourText = 'midnight';
                stage = '';
            } else if(hr === 12) {
                hourText = 'noon';
                stage = '';
            } else {
                hourText = convertHr(hr) + " "
            }
            let minText = calMinutes(min)
            res = minText + " past " + hourText + stage
            return res;
            
        } else {
            if(hr === 23) {
                hourText = 'midnight';
                stage = '';
            } else if(hr === 11) {
                hourText = 'noon';
                stage = '';
            } else {
                hourText = convertHr(hr+1) + " "
                stage = checkStage(hr+1)
            }
            let minText = calMinutes(min)
            res = minText + " to " + hourText + stage
            return res;
        }
    } else {
        let hourText = convertHr(hr)
        let minText = convertMin(min)
        res = hourText + ' ' + minText + ' ' + stage
        return res;
    }

}

module.exports = time2text

// noon 12:00    midnight 00:00 √
// morning 00:01-11:59 √
// afternoon 12:01-17:59 √
// evening 18:01-23:59 √
// isOclck   hr o'clock + stage
// isMul (5x): 
//    --if yes: 
//    calMinutes() num past/[to] + hr[+1] + stage
//    --if no:
//    convertMin(oh + min || '' + min)   hr + min + stage

// minitues stage
//  [1]  minimutes === 0  o'clock  ||  <10  oh 
//     5x :
//       (1) 15x   <30 past || >30 to
//       (2) 30x
//       (3) else   <30 past || >30 to

// examples:
// {"time":"00:01","text":"twelve oh one in the morning"}
// {"time":"00:05","text":"five past midnight"}
// {"time":"00:10","text":"ten past midnight"},
// {"time":"00:15","text":"quarter past midnight"}
// {"time":"00:20","text":"twenty past midnight"}
// {"time":"00:25","text":"twelve twenty-five in the morning"}
// {"time":"00:30","text":"half past midnight"}
// {"time":"00:35","text":"twelve thirty-five in the morning"}
// {"time":"00:40","text":"twenty to one in the morning"}
// {"time":"00:45","text":"quarter to one in the morning"}
// {"time":"00:50","text":"ten to one in the morning"}
// {"time":"00:55","text":"five to one in the morning"}
// {"time":"01:05","text":"five past one in the morning"}
// {"time":"23:55","text":"five to midnight"}
// {"time":"23:45","text":"quarter to midnight"},
// {"time":"23:50","text":"ten to midnight"}
// {"time":"12:05","text":"five past noon"}