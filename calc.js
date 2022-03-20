// === CALCULATIONS FOR THE REGULAR WORKING HOURS ===
function getRegWorkHrs(regDate, regSchedTimeIn, regSchedTimeOut, regLogTimeIn, regLogTimeOut) {
    var timein = (regSchedTimeIn > regLogTimeIn) ? regSchedTimeIn : regLogTimeIn;
    var timeout = (regSchedTimeOut < regLogTimeOut) ? regSchedTimeOut : regLogTimeOut;
    var regDateTimeIn = dateTimeMaker(regDate, timein);
    var regDateTimeOut = dateTimeMaker(regDate, timeout);
    var regWorkHrs = (((regDateTimeOut - regDateTimeIn) / (1 * 60 * 60 * 1000)) - 1);
    var regWorkHrs = (regWorkHrs > 0) ? regWorkHrs : regWorkHrs + 24;
    var regWorkHrs = regWorkHrs;
    // console.log('timein= '.concat(timein));
    // console.log('timeout= '.concat(timeout));
    // console.log('regDateTimeIn= '.concat(regDateTimeIn));
    // console.log('regDateTimeOut= '.concat(regDateTimeOut));
    // console.log('regWorkHrs= '.concat(regWorkHrs));

    return regWorkHrs;
}

// === CALCULATIONS FOR THE NSD (REG) HOURS===
function getRegNsdHrs(regDate, regSchedTimeIn, regSchedTimeOut, regLogTimeIn, regLogTimeOut) {
    var timein = (regSchedTimeIn > regLogTimeIn) ? regSchedTimeIn : regLogTimeIn;
    var timeout = (regSchedTimeOut < regLogTimeOut) ? regSchedTimeOut : regLogTimeOut;
    var regDateTimeIn = dateTimeMaker(regDate, timein);
    var regDateTimeOut = dateTimeMaker(regDate, timeout);
    var regNsdInHrs = regDateTimeIn.getHours();
    var regNsdOutHrs = regDateTimeOut.getHours();
    var regNsdDateChecker = (regDateTimeOut - regDateTimeIn) >= 0 ? 0 : 1;
    var regNsdHrs = nsdHoursCalc(regNsdInHrs, regNsdOutHrs, regNsdDateChecker, regDateTimeIn, regDateTimeOut);
    // console.log('timein= '.concat(timein));
    // console.log('timeout= '.concat(timeout));
    // console.log('regNsdInHrs= '.concat(regNsdInHrs));
    // console.log('regNsdOutHrs= '.concat(regNsdOutHrs));
    // console.log('regNsdDateChecker= '.concat(regNsdDateChecker));
    // console.log('regNsdHrs= '.concat(regNsdHrs));

    return regNsdHrs;
}

// === CALCULATIONS FOR THE OVERTIME HOURS ON REGULAR WORKING DAY ===
function getRegOTHrs(regDate, regOtTimeIn, regOtTimeOut) {
    var regDateOtTimeIn = dateTimeMaker(regDate, regOtTimeIn);
    var regDateOtTimeOut = dateTimeMaker(regDate, regOtTimeOut);
    var regOtHrs = ((regDateOtTimeOut - regDateOtTimeIn) / (1 * 60 * 60 * 1000));
    var regOtHrs = (regOtHrs >= 0) ? regOtHrs : regOtHrs + 24;
    var regOtHrs = regOtHrs;
    // console.log('regDateOtTimeIn= '.concat(regDateOtTimeIn));
    // console.log('regDateOtTimeOut= '.concat(regDateOtTimeOut));
    // console.log('regOtHrs= '.concat(regOtHrs));

    return regOtHrs;
}

// ===CALCULATIONS FOR THE NSD OT HOURS ===
function getRegNsdOtHrs(regDate, regOtTimeIn, regOtTimeout) {
    var regOtDateTimeIn = dateTimeMaker(regDate, regOtTimeIn);
    var regOtDateTimeOut = dateTimeMaker(regDate, regOtTimeout);
    var regOtTimeInHrs = regOtDateTimeIn.getHours();
    var regOtTimeOutHrs = regOtDateTimeOut.getHours();
    var regOtDateTimeChecker = (regOtTimeOutHrs - regOtTimeInHrs) >= 0 ? 0 : 1;
    var regNsdOtHrs = nsdHoursCalc(regOtTimeInHrs, regOtTimeOutHrs, regOtDateTimeChecker, regOtDateTimeIn, regOtDateTimeOut);
    // console.log('regOtDateTimeIn= '.concat(regOtDateTimeIn));
    // console.log('regOtDateTimeOut= '.concat(regOtDateTimeOut));
    // console.log('regOtTimeInHrs= '.concat(regOtTimeInHrs));
    // console.log('regOtTimeOutHrs= '.concat(regOtTimeOutHrs));
    // console.log('regOtDateTimeChecker= '.concat(regOtDateTimeChecker));
    // console.log('regNsdOtHrs= '.concat(regNsdOtHrs));

    return regNsdOtHrs;
}

// === CALCULATIONS FOR FIRST 8 HOURS OVERTIME WORK === //
function getFirst8Hrs(otDate, otTimeStartA, otTimeEndA, otBreak) {
    var otDateTimeStartA = dateTimeMaker(otDate, otTimeStartA);
    var otDateTimeEndA = dateTimeMaker(otDate, otTimeEndA);
    var otDateBreakTime = dateTimeMaker(otDate, otBreak);
    var first8Hrs = ((Number(otDateTimeEndA) - Number(otDateTimeStartA)) - (Number(otDateBreakTime) - Number(otDateBreakTime.setHours(0)))) / (1 * 60 * 60 * 1000);
    // console.log('otDateTimeStartA= '.concat(otDateTimeStartA));
    // console.log('otDateTimeEndA= '.concat(otDateTimeEndA));
    // console.log('otDateBreakTime= '.concat(otDateBreakTime));
    // console.log('first8Hrs= '.concat(first8Hrs));

    return first8Hrs;
}

// === CALCULATIONS FOR THE EXCESS HOURS OVERTIME WORK === //
function getExcessHrs(otDate, otTimeStartB, otTimeEndB) {
    var otDateTimeStartB = dateTimeMaker(otDate, otTimeStartB);
    var otDateTimeEndB = dateTimeMaker(otDate, otTimeEndB);
    var excessHrs = (Number(otDateTimeEndB) - Number(otDateTimeStartB)) / (1 * 60 * 60 * 1000);
    var excessHrs = (excessHrs >= 0) ? excessHrs : excessHrs + 24;
    // console.log('otDateTimeStartB= '.concat(otDateTimeStartB));
    // console.log('otDateTimeEndB= '.concat(otDateTimeEndB));
    // console.log('excessHrs= '.concat(excessHrs));

    return excessHrs
}

//compute total overtime pay
function getTotal(input, rows) {
    var total = 0;
    for (let i = 1; i <= rows; i++) {
        var total = total + parseFloat(document.getElementById(input.concat(i)).value);
    }
    // console.log('total= '.concat(total));
    return total;
}

// compute for tax amount
function getTaxAmount(taxableIncome) {
    if (taxableIncome > 0 && taxableIncome <= 10417) {
        var taxRate = 0;
        var taxCap = 10417;
        var taxPMWT = 0;
    }
    else if (taxableIncome > 10417 && taxableIncome <= 16667) {
        var taxRate = 0.2;
        var taxCap = 10417;
        var taxPMWT = 0;
    }
    else if (taxableIncome > 16667 && taxableIncome <= 33333) {
        var taxRate = 0.25;
        var taxCap = 16667;
        var taxPMWT = 1250;
    }
    else if (taxableIncome > 33333 && taxableIncome <= 83333) {
        var taxRate = 0.30;
        var taxCap = 33333;
        var taxPMWT = 5416.67;
    }
    else if (taxableIncome > 83333 && taxableIncome <= 333333) {
        var taxRate = 0.32;
        var taxCap = 83333;
        var taxPMWT = 20416.67;
    }
    else if (taxableIncome > 333333) {
        var taxRate = 0.35;
        var taxCap = 333333;
        var taxPMWT = 100416.67;
    } else { 
        var taxRate = 0;
        var taxCap = 0;
        var taxPMWT = 0;
    }
    var TaxAmount = ((taxableIncome - taxCap) * taxRate) + taxPMWT;
    // console.log('taxCap= '.concat(taxCap));
    // console.log('taxRate= '.concat(taxRate));
    // console.log('taxPMWT= '.concat(taxPMWT));
    // console.log('TaxAmount= '.concat(TaxAmount));

    return TaxAmount;
}

