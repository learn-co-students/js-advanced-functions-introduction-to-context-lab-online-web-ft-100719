// Your code here

const createEmployeeRecord = (arr) =>{
    let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeRecord
}

const createEmployeeRecords = (arrOfArr) =>{
    return arrOfArr.map(createEmployeeRecord)
}

const createTimeInEvent = (employeeObj, timeStamp) =>{
    let [date, hour] = timeStamp.split(" ")
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeObj.timeInEvents.push(timeEvent)
    return employeeObj
}

const createTimeOutEvent = (employeeObj, timeStamp) =>{
    let [date, hour] = timeStamp.split(" ")
    let timeEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    employeeObj.timeOutEvents.push(timeEvent)
    return employeeObj
}

const hoursWorkedOnDate = (employeeObj, date) =>{
    const checkDate = inputDate =>{
        return inputDate.date.match(date)
    }

    let timeIn = employeeObj.timeInEvents.find(checkDate)
    let timeOut = employeeObj.timeOutEvents.find(checkDate)
    let hourIn = parseInt(timeIn.hour)/100
    let hourOut = parseInt(timeOut.hour)/100

    let hoursWorked = hourOut - hourIn
    return hoursWorked
}

const wagesEarnedOnDate = (employeeObj, date) =>{
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour
}

const allWagesFor = (employeeObj) =>{
    //Create set of punch in/out times
    let daysWorked = employeeObj.timeInEvents.map(timeObj => {return timeObj.date})
    //for each set, calculate wagesEarned
    let wages = daysWorked.reduce(function(total, date){
        return total + wagesEarnedOnDate(employeeObj, date)
    }, 0)
    //sum ALL wages earned
    return wages
}

const findEmployeeByFirstName = (employeeArray, firstName) =>{
    const checkName = record =>{
        return record.firstName.match(firstName)
    }
    return employeeArray.find(checkName)
}

const calculatePayroll = (employeeArray) =>{
    return employeeArray.reduce(function(total, rec){
        return total + allWagesFor(rec)
    }, 0)
}