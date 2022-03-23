// Salary Details | Timesheet (Regular Days) | Timesheet (Holidays and Rest Days) | Salary Deductions } Net Salary //

function programStart() {
    var monthly = document.getElementById('monthly').value;
    var allowances = document.getElementById('allowances').value;
    var workingdays = document.getElementById('workingdays').value;
    var leaveWOPay = document.getElementById('absences').value;
    var btaxDeductions = document.getElementById('btaxDeductions').value;
    var ataxdeductions = document.getElementById('ataxdeductions').value;
    if (monthly == '' || allowances == '' || workingdays == '' || leaveWOPay == '' || btaxDeductions == '' || ataxdeductions == '') {
        return false;
    } else {
        callAll();
    }

}

function callAll() {

    // ===== SALARY DETAILS ===== //

    var monthly = document.getElementById('monthly').value;
    var allowances = document.getElementById('allowances').value;
    var workingdays = document.getElementById('workingdays').value;

    if (monthly == "" || monthly == 0 || allowances == "" || workingdays == "") {
        var allowances = 0;
        var workingdays = 0;
        var monthly = 0;
        var daily = 0;
        var hourly = 0;
        var minute = 0;
        console.log('monthly= '.concat(monthly));
        console.log('daily= '.concat(daily));
        console.log('hourly= '.concat(hourly));
        console.log('minute= '.concat(minute));
    }
    else {
        var daily = (monthly * 12) / workingdays;
        var hourly = daily / 8;
        var minute = hourly / 60;
        console.log('monthly= '.concat(monthly));
        console.log('daily= '.concat(daily));
        console.log('hourly= '.concat(hourly));
        console.log('minute= '.concat(minute));
    }
    document.getElementById('daily').value = daily.toFixed(2);
    document.getElementById('hourly').value = hourly.toFixed(2);
    document.getElementById('minute').value = minute.toFixed(2);



    // ====== TIMESHEET (Regular Days) ====== //


    // creating a loop
    for (let i = 1; i <= 12; i++) {
        var regdayID = 'regday'.concat(i);
        var regscheduleinID = 'regschedulein'.concat(i);
        var regscheduleoutID = 'regscheduleout'.concat(i);
        var reglogtimeinID = 'reglogtimein'.concat(i);
        var reglogtimeoutID = 'reglogtimeout'.concat(i);
        var regreghrsID = 'regreghrs'.concat(i);
        var regovertimeinID = 'regovertimein'.concat(i);
        var regovertimeoutID = 'regovertimeout'.concat(i);
        var regothrsID = 'regothrs'.concat(i);
        var regotpayID = 'regotpay'.concat(i);
        var regnsdpayID = 'regnsdpay'.concat(i);
        var regnsdotpayID = 'regnsdotpay'.concat(i);
        var regtotalnsdotpayID = 'regtotalnsdotpay'.concat(i);

        var regday = document.getElementById(regdayID).value;
        if (regday == '') { continue }
        var regschedulein = document.getElementById(regscheduleinID).value;
        var regscheduleout = document.getElementById(regscheduleoutID).value;
        var reglogtimein = document.getElementById(reglogtimeinID).value;
        var reglogtimeout = document.getElementById(reglogtimeoutID).value;
        var regovertimein = document.getElementById(regovertimeinID).value;
        var regovertimeout = document.getElementById(regovertimeoutID).value;

        if (regday !== '' && regschedulein !== '' && regscheduleout !== '' && reglogtimein !== '' && reglogtimeout !== '') {
            // === CALCULATIONS FOR THE REGULAR WORKING HOURS ===       
            var regWorkHrs = getRegWorkHrs(regday, regschedulein, regscheduleout, reglogtimein, reglogtimeout);
            document.getElementById(regreghrsID).value = regWorkHrs.toFixed(2);
            console.log('regWorkHrs= '.concat(regWorkHrs));

            // === CALCULATIONS FOR THE NSD (REG) PAYMENT ===
            var regNsdHrs = getRegNsdHrs(regday, regschedulein, regscheduleout, reglogtimein, reglogtimeout);
            var regnsdpay = (regNsdHrs > 0) ? regNsdHrs * hourly * 0.1 : 0;
            document.getElementById(regnsdpayID).value = regnsdpay.toFixed(2);
            console.log('regNsdHrs= '.concat(regNsdHrs));
            console.log('regnsdpay= '.concat(regnsdpay));

            // === CALCULATIONS FOR THE OVERTIME HOURS ===
            var regOtHrs = getRegOTHrs(regday, regovertimein, regovertimeout);
            document.getElementById(regothrsID).value = regOtHrs.toFixed(2);
            console.log('regOtHrs= '.concat(regOtHrs));

            // === CALCULATIONS FOR THE OVERTIME PAY ===
            var regOtPay = hourly * regOtHrs * 1.25;
            document.getElementById(regotpayID).value = regOtPay.toFixed(2);
            console.log('regOtPay= '.concat(regOtPay));

            // === CALCULATIONS FOR NSD (OT) ===
            var regNsdOtHrs = getRegNsdOtHrs(regday, regovertimein, regovertimeout);
            var regNsdOtPay = (regNsdOtHrs > 0) ? regNsdOtHrs * hourly * 0.1 * 1.25 : 0;
            document.getElementById(regnsdotpayID).value = regNsdOtPay.toFixed(2);
            console.log('regNsdOtHrs= '.concat(regNsdOtHrs));
            console.log('regNsdOtPay= '.concat(regNsdOtPay));

            // CALCULATIONS TO GET THE TOTAL OF THE OVERTIME, NSD (REG AND OT)
            var totalnsdotpay =
                parseFloat(document.getElementById(regotpayID).value) +
                parseFloat(document.getElementById(regnsdpayID).value) +
                parseFloat(document.getElementById(regnsdotpayID).value);
            document.getElementById(regtotalnsdotpayID).value = totalnsdotpay.toFixed(2);
            console.log('totalnsdotpay= '.concat(totalnsdotpay));
        } else {
            var regWorkHrs = 0;
            var regOtHrs = 0;
            var regOtPay = 0;
            var regnsdpay = 0;
            var regNsdOtPay = 0;
            var totalnsdotpay = 0;
        }
    }

    // === TIMESHEET (Regular Days) = TOTALS === //

    // get the total actual working hours for the whole payroll period
    var regTotalWorkingDays = countIF('regreghrs', 12);
    console.log('regTotalWorkingDays= '.concat(regTotalWorkingDays));
    var regTotalWorkingHoursExpected = regTotalWorkingDays * 8;
    console.log('regTotalWorkingHoursExpected= '.concat(regTotalWorkingHoursExpected));
    var regTotalWorkingHoursActual = getTotal('regreghrs', 12);
    document.getElementById('regTotalWorkingHoursActual').value = regTotalWorkingHoursActual.toFixed(2);
    console.log('regTotalWorkingHoursActual= '.concat(regTotalWorkingHoursActual));

    // get the total overtime hours in a regular working day for the whole payroll period
    var regTotalOtHours = getTotal('regothrs', 12);
    document.getElementById('regTotalOtHours').value = regTotalOtHours.toFixed(2);
    console.log('regTotalOtHours= '.concat(regTotalOtHours));

    // get the total pay for the overtime hours during regular working days for the whole payroll period
    var regTotalOtPay = getTotal('regotpay', 12);
    document.getElementById('regTotalOtPay').value = regTotalOtPay.toFixed(2);
    console.log('regTotalOtPay= '.concat(regTotalOtPay));

    // get the total nsd pay earned within the regular working hours for the whole payroll period
    var regTotalNsdRegPay = getTotal('regnsdpay', 12);
    document.getElementById('regTotalNsdRegPay').value = regTotalNsdRegPay.toFixed(2);
    console.log('regTotalNsdRegPay= '.concat(regTotalNsdRegPay));

    // get the total nsd pay earned within the overtime period for the whole payroll period
    var regTotalNsdOtPay = getTotal('regnsdotpay', 12);
    document.getElementById('regTotalNsdOtPay').value = regTotalNsdOtPay.toFixed(2);
    console.log('regTotalNsdOtPay= '.concat(regTotalNsdOtPay));

    // get the total overtime and nsd pay earned while working in regular working days for the whole payroll period
    regTotalOvertimeNsdPay = regTotalOtPay + regTotalNsdRegPay + regTotalNsdOtPay;
    document.getElementById('regTotalOvertimeNsdPay').value = regTotalOvertimeNsdPay.toFixed(2);
    console.log('regTotalOvertimeNsdPay= '.concat(regTotalOvertimeNsdPay));

    // ===== TIMESHEET (Holiday and Rest Day) ====== //

    //creating a loop
    for (let i = 1; i <= 5; i++) {

        var otDateID = 'otDate'.concat(i);
        var otRateID = 'otRate'.concat(i);
        var otTimeStartAID = 'otTimeStartA'.concat(i);
        var otTimeEndAID = 'otTimeEndA'.concat(i);
        var otTimeStartBID = 'otTimeStartB'.concat(i);
        var otTimeEndBID = 'otTimeEndB'.concat(i);
        var otBreakID = 'otBreak'.concat(i);
        var otTtlHrsID = 'otTtlHrs'.concat(i);
        var otOtPayAID = 'otOtPayA'.concat(i);
        var otOtPayBID = 'otOtPayB'.concat(i);
        var otNsdPayAID = 'otNsdPayA'.concat(i);
        var otNsdPayBID = 'otNsdPayB'.concat(i);
        var otTtlPayID = 'otTtlPay'.concat(i);

        var otDate = document.getElementById(otDateID).value;
        var otRate = document.getElementById(otRateID).value;
        var otTimeStartA = document.getElementById(otTimeStartAID).value;
        var otTimeEndA = document.getElementById(otTimeEndAID).value;
        var otTimeStartB = document.getElementById(otTimeStartBID).value;
        var otTimeEndB = document.getElementById(otTimeEndBID).value;
        var otBreak = document.getElementById(otBreakID).value;
        var otTtlHrs = document.getElementById(otTtlHrsID).value;
        var otOtPayA = document.getElementById(otOtPayAID).value;
        var otOtPayB = document.getElementById(otOtPayBID).value;
        var otNsdPayA = document.getElementById(otNsdPayAID).value;
        var otNsdPayB = document.getElementById(otNsdPayBID).value;
        var otTtlPay = document.getElementById(otTtlPayID).value;

        //calculate for the total overtime hours rendered on Holiday and/or Rest Day
        if (otDate === '' || otTimeStartA === '' || otTimeEndA === '' || otBreak === '') {
            var otTtlHrs = 0;
            var first8Hrs = 0;
            var excessHrs = 0;
        }
        else {
            var first8Hrs = getFirst8Hrs(otDate, otTimeStartA, otTimeEndA, otBreak);
            var excessHrs = getExcessHrs(otDate, otTimeStartB, otTimeEndB);
            var otTtlHrs = Number(first8Hrs) + Number(excessHrs);
        }
        document.getElementById(otTtlHrsID).value = otTtlHrs.toFixed(2);
        console.log('otTtlHrs= '.concat(otTtlHrs));

        //calculate for the overtime pay for the first 8 hours
        var otOtPayA = first8Hrs * otRate * hourly;
        document.getElementById(otOtPayAID).value = otOtPayA.toFixed(2);
        console.log('otOtPayA= '.concat(otOtPayA));

        //calculate for the overtime pay for the excess hours
        var otOtPayB = excessHrs * otRate * hourly * 1.3;
        document.getElementById(otOtPayBID).value = otOtPayB.toFixed(2);
        console.log('otOtPayB= '.concat(otOtPayB));

        //compute for the NSD pay for the first 8 hours
        if (otDate === '' || otTimeStartA === '' || otTimeEndA === '') {
            var otNsdAHrs = 0;
            var otNsdPayA = 0;
            console.log('otNsdAHrs= '.concat(otNsdAHrs));
            console.log('otNsdPayA= '.concat(otNsdPayA));
        }
        else {
            var otNsdAHrs = getRegNsdHrs(otDate, otTimeStartA, otTimeEndA, otTimeStartA, otTimeEndA)
            var otNsdPayA = (otNsdAHrs > 0) ? otNsdAHrs * hourly * 0.1 * otRate : 0;
            console.log('otNsdAHrs= '.concat(otNsdAHrs));
            console.log('otNsdPayA= '.concat(otNsdPayA));
        }
        document.getElementById(otNsdPayAID).value = otNsdPayA.toFixed(2);

        // compute for the NSD pay for the excess hours

        var otNsdBHrs = getRegNsdHrs(otDate, otTimeStartB, otTimeEndB, otTimeStartB, otTimeEndB);
        var otNsdPayB = (otNsdBHrs > 0) ? otNsdBHrs * hourly * 0.1 * 1.25 * (1 + parseFloat(otRate)) : 0;
        document.getElementById(otNsdPayBID).value = otNsdPayB.toFixed(2);
        console.log('otNsdBHrs= '.concat(otNsdBHrs));
        console.log('otNsdPayB= '.concat(otNsdPayB));

        //compute for the total of Overtime and NSD pay
        var otTtlPay =
            parseFloat(otOtPayA) +
            parseFloat(otOtPayB) +
            parseFloat(otNsdPayA) +
            parseFloat(otNsdPayB);
        document.getElementById(otTtlPayID).value = otTtlPay.toFixed(2);
        console.log('otTtlPay= '.concat(otTtlPay));
    }

    // === TIMESHEET (Holidays and Rest Days) = TOTALS === //

    // get the total overtime hours during holidays and/or rest days
    var otTotalWorkingHours = getTotal('otTtlHrs', 5);
    document.getElementById('otTotalWorkingHours').value = otTotalWorkingHours.toFixed(2);
    console.log('otTotalWorkingHours= '.concat(otTotalWorkingHours));

    // get the total overtime pay for each first 8 hours of work on holiday or rest day
    var otTotalOtPayA = getTotal('otOtPayA', 5);
    document.getElementById('otTotalOtPayA').value = otTotalOtPayA.toFixed(2);
    console.log('otTotalOtPayA= '.concat(otTotalOtPayA));

    // get the total overtime pay for each excess of 8 hours of work on holiday or rest day
    var otTotalOtPayB = getTotal('otOtPayB', 5);
    document.getElementById('otTotalOtPayB').value = otTotalOtPayB.toFixed(2);
    console.log('otTotalOtPayB= '.concat(otTotalOtPayB));

    // get the total NSD pay for each first 8 hours of work on holiday or rest day
    var otTotalNsdPayA = getTotal('otNsdPayA', 5);
    document.getElementById('otTotalNsdPayA').value = otTotalNsdPayA
    console.log('otTotalNsdPayA= '.concat(otTotalNsdPayA));

    // get the total NSD pay for each eacess of 8 hours  of work on holiday or rest day
    var otTotalNsdPayB = getTotal('otNsdPayB', 5);
    document.getElementById('otTotalNsdPayB').value = otTotalNsdPayB
    console.log('otTotalNsdPayB= '.concat(otTotalNsdPayB));

    // get total pay earned while working on holiday or rest day
    var otTotalPay = otTotalOtPayA + otTotalOtPayB + otTotalNsdPayA + otTotalNsdPayB;
    document.getElementById('otTotalPay').value = otTotalPay.toFixed(2);
    console.log('otTotalPay= '.concat(otTotalPay));


    // ===== SALARY DEDUCTIONS ===== //


    //get leave without pay deductions
    var leaveWOPay = document.getElementById('absences').value;
    var totalLeaveWOPay = (leaveWOPay > 0) ? leaveWOPay * daily : 0;
    console.log('totalLeaveWOPay= '.concat(totalLeaveWOPay));

    //get undertime/late deductions
    var regTotalLateHours = regTotalWorkingHoursExpected - regTotalWorkingHoursActual;
    console.log('regTotalLateHours= '.concat(regTotalLateHours));
    var totalLateHoursDeductions = (regTotalLateHours.toFixed(2) / 8) * daily;
    document.getElementById('totalLateHoursDeductions').value = totalLateHoursDeductions.toFixed(2);
    console.log('totalLateHoursDeductions= '.concat(totalLateHoursDeductions));

    // to get the philhealth premium
    var philhealthchecker = (document.getElementById('philhealth.checkbox').checked) ? 0 : 1;
    var philhealth = (monthly * 0.03 * philhealthchecker) / 2;
    document.getElementById('philhealth').value = philhealth.toFixed(2);
    console.log('philhealth= '.concat(philhealth));

    //to get the SSS premium
    if (monthly != 0 || monthly != '') {
        var min = 3250;
        var max = 3729.99;
        var share = 135;
        var sss = 0;
        console.log('min= '.concat(min));
        console.log('max= '.concat(max));
        console.log('share= '.concat(share));
        console.log('salary= '.concat(monthly));

        // if the salary is below the minimum bracket
        if (monthly < min) {
            var sss = sss + 135;
        }
        // if the monthly is beyond the bracket, which means beyond 24750
        else if (monthly > 24750) {
            var sss = 1125;
        }
        else {
            var share = share + 22.5;
            for (let x = 3250; x <= 24750; x = x + 500) {
                if (monthly >= min && monthly <= max) {
                    var sss = share;
                } else {
                    var min = min + 500;
                    var max = max + 500;
                    var share = share + 22.5;
                }
            }
        }
    }
    else {
        var sss = 0;
    }
    // apply values to SSS withchecker
    var ssschecker = (document.getElementById('sss.checkbox').checked) ? 0 : 1;
    var sss = sss * ssschecker;
    document.getElementById('sss').value = sss.toFixed(2);
    console.log('sss= '.concat(sss));


    if (monthly == "" || monthly == 0 || allowances == "" || workingdays == "") {
        var hdmf = 0.00;
    } else
        {
            // calculate the HDMF premium
            var hdmfchecker = (document.getElementById('hdmf.checkbox').checked) ? 0 : 1;
            var hdmf = Math.min(100, document.getElementById('monthly').value * 0.01 * hdmfchecker);
            document.getElementById('hdmf').value = hdmf.toFixed(2);
            console.log('hdmf= '.concat(hdmf));
        }

        //get total premiums
        var govtPremiums = parseFloat(philhealth) + parseFloat(sss) + parseFloat(hdmf);
        console.log('govtPremiums= '.concat(govtPremiums));


        // ====== NET SALARY ===== //


        //get total overtime pay = ot pay on regular working day + ot pay on first 8 hours + ot pay on excess hours
        var totalOvertimePay = regTotalOtPay + otTotalOtPayA + otTotalOtPayB;
        console.log('totalOvertimePay= '.concat(totalOvertimePay));

        //get total nsd pay
        var totalNsdPay = regTotalNsdRegPay + regTotalNsdOtPay + otTotalNsdPayA + otTotalNsdPayB;
        console.log('totalNsdPay= '.concat(totalNsdPay));

        //get gross income = half of monthly rate + total overtime pay + total nsd pay
        var grossIncome = (monthly * .5) + parseFloat(totalOvertimePay) + parseFloat(totalNsdPay);
        document.getElementById('grossincome').value = grossIncome.toFixed(2);
        console.log('grossIncome= '.concat(grossIncome));

        // get the manually added before tax deductions
        var btaxDeductions = document.getElementById('btaxDeductions').value;
        var btaxDeductions = (btaxDeductions === '' || btaxDeductions === 0) ? 0 : btaxDeductions;
        console.log('btaxDeductions= '.concat(btaxDeductions));

        //get taxable income = gross income - before tax deductions - premiums - undertime/late - absences
        var taxableIncome = parseFloat(grossIncome) - parseFloat(btaxDeductions) - parseFloat(govtPremiums) - parseFloat(totalLateHoursDeductions) - parseFloat(totalLeaveWOPay);
        document.getElementById('nettaxableincome').value = taxableIncome.toFixed(2);
        console.log('taxableIncome= '.concat(taxableIncome));

        //get tax amount
        var TaxAmount = getTaxAmount(taxableIncome);
        document.getElementById('tax').value = TaxAmount.toFixed(2);
        console.log('TaxAmount= '.concat(TaxAmount));

        //get the after tax deductions
        var ataxdeductions = document.getElementById('ataxdeductions').value;
        var ataxdeductions = (ataxdeductions === '' || ataxdeductions === 0) ? 0 : ataxdeductions;
        console.log('ataxdeductions= '.concat(ataxdeductions));

        //get net income = gross income - tax - after tax deductions
        var NetIncome = parseFloat(taxableIncome) - parseFloat(TaxAmount) - parseFloat(ataxdeductions) + parseFloat(allowances);
        document.getElementById('netincome').value = NetIncome.toFixed(2);
        console.log('NetIncome= '.concat(NetIncome));

    }