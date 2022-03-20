function nsdHoursCalc(getHourIn, getHourOut, dateChecker, startDateTime, endDateTime) {

    //set midnight time
    var midnight = new Date(startDateTime);
    midnight.setHours(24)
    //set ten-pm time
    var tenpm = new Date(startDateTime);
    tenpm.setHours(22)
    //set six-pm time
    var sixam = new Date(startDateTime);
    sixam.setHours(6)

    if (getHourIn <= 22 && getHourOut > 22 && dateChecker === 0) {

        var nsdHours = (endDateTime - tenpm) / (1 * 60 * 60 * 1000);
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //getHourIn is later than 10PM and getHourOut is later than 10PM or
    ////getHourIn is on or later than midnight and getHourOut is earlier than 6AM
    else if ((getHourIn > 22 && getHourOut > 22 && dateChecker === 0) || (getHourIn >= 0 && getHourOut <= 6 && dateChecker === 0)) {

        var nsdHours = (endDateTime - startDateTime) / (1 * 60 * 60 * 1000);
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //getHourIn is on or earlier than 10PM and getHourOut is earlier than 6AM
    else if ((getHourIn <= 22 && getHourOut <= 6 && dateChecker === 1)) {

        var nsdHours = ((endDateTime - tenpm) / (1 * 60 * 60 * 1000)) + 24;
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //getHourIn is on or earlier than 10PM and getHourOut is later than 6AM
    else if ((getHourIn <= 22 && getHourOut >= 6 && dateChecker === 1)) {

        var nsdHours = ((midnight - startDateTime) / (1 * 60 * 60 * 1000)) + 6;
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //getHourIn is later than 10PM and getHourOut is earlier than 6AM
    else if ((getHourIn > 22 && getHourOut < 6 && dateChecker === 1)) {

        var nsdHours = ((endDateTime - startDateTime) / (1 * 60 * 60 * 1000)) + 24;
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //getHourIn is later than 10PM and getHourOut is later than 6AM
    else if ((getHourIn > 22 && getHourOut >= 6 && dateChecker === 1)) {

        var nsdHours = ((midnight - startDateTime) / (1 * 60 * 60 * 1000)) + 6;
        // console.log(('nsdHours= '.concat(nsdHours)));
    }
    //if getHourIn is earlier than 6AM and getHourOut is later 6AM
    else if (getHourIn < 6 && getHourOut > 6 && dateChecker === 0) {

        var nsdHours = (sixam - startDateTime) / (1 * 60 * 60 * 1000);
        // console.log(('nsdHours= '.concat(nsdHours)));

    } else { var nsdHours = 0 };
    // console.log(('nsdHours= '.concat(nsdHours)));
    return nsdHours;

}

// autofill in dates excluding weekends
function noweekends() {
    for (let i = 2; i <= 12; i++) {
        var sourcedate = document.getElementById('regday'.concat(i - 1)).value;
        var startdate = new Date(sourcedate);
        var newdate = new Date(startdate.setDate(startdate.getDate() + 1));
        var newdate = (newdate.getDay() > 5) ? new Date(newdate.setDate(newdate.getDate() + 2)) : newdate;
        var finaldate = newdate.toISOString().split('T')[0];
        document.getElementById('regday'.concat(i)).value = finaldate;
        // console.log(('sourcedate= '.concat(sourcedate)));
        // console.log(('startdate= '.concat(startdate)));
        // console.log(('newdate= '.concat(newdate)));
        // console.log(('finaldate= '.concat(finaldate)));
    }
}

// autofill in dates inlcuding weekends
function withweekends() {
    for (let i = 2; i <= 12; i++) {
        var sourcedate = document.getElementById('regday'.concat(i - 1)).value;
        var startdate = new Date(sourcedate)
        var newdate = new Date(startdate.setDate(startdate.getDate() + 1));
        var finaldate = newdate.toISOString().split('T')[0]
        document.getElementById('regday'.concat(i)).value = finaldate;
        // console.log(('sourcedate= '.concat(sourcedate)));
        // console.log(('startdate= '.concat(startdate)));
        // console.log(('newdate= '.concat(newdate)));
        // console.log(('finaldate= '.concat(finaldate)));
    }
}

// clear inputs on the whole line
function clearinput(input) {
    document.getElementById('regday'.concat(input)).value = "";
    document.getElementById('regschedulein'.concat(input)).value = "";
    document.getElementById('regscheduleout'.concat(input)).value = "";
    document.getElementById('reglogtimein'.concat(input)).value = "";
    document.getElementById('reglogtimeout'.concat(input)).value = "";
    document.getElementById('regovertimein'.concat(input)).value = "";
    document.getElementById('regovertimeout'.concat(input)).value = "";
    document.getElementById('regreghrs'.concat(input)).value = "0.00";
    document.getElementById('regothrs'.concat(input)).value = "0.00";
    document.getElementById('regotpay'.concat(input)).value = "0.00";
    document.getElementById('regnsdpay'.concat(input)).value = "0.00";
    document.getElementById('regnsdotpay'.concat(input)).value = "0.00";
    document.getElementById('regtotalnsdotpay'.concat(input)).value = "0.00";
    // console.log(('input= '.concat(input)));
}

// combines date and time to create a fulldate
function dateTimeMaker(date, time) {
    dateTime = new Date(date + ',' + time);
    // console.log(('dateTime= '.concat(dateTime)));
    return dateTime;
}

//count if function
function countIF(input, rows) {
    var count = 0;
    for (let i = 1; i <= rows; i++) {
        if (document.getElementById(input.concat(i)).value > 0) {
            var count = count  + 1;
        }
        else {
            var count = count
        };
    }
    return count;
}

//autofill time copying the first row
function copyTime(target) {
    var sourceTime = document.getElementById(target.concat('1')).value;
    console.log('sourceTime= '.concat(sourceTime));
    for (let i = 2; i <=12; i++) {
        if (document.getElementById('regday'.concat(i)).value != "") {
            document.getElementById(target.concat(i)).value = sourceTime;
        }
        else {
            document.getElementById(target.concat(i)).value = "";
        }
    }

}