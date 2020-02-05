// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
     firstName: array[0],
     familyName: array[1],
     title: array[2],
     payPerHour: array[3],
     timeInEvents: [],
     timeOutEvents: []

    }
    return employeeRecord
    
}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(createEmployeeRecord)
}

function createTimeInEvent(empObj, dateStamp ){
    //dateStamp format (YYY-MM-DD HHMM) split at space
    let [date, hour] = dateStamp.split(" ")
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    empObj.timeInEvents.push(timeEvent)
    return empObj
}

function createTimeOutEvent(empObj, dateStamp ){
    
    let [date, hour] = dateStamp.split(" ")
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    
    return empObj
}

function hoursWorkedOnDate(empObj, date){
    const timeIn = empObj.timeInEvents.find(timeInEvent => {return timeInEvent.date === date;
    }).hour;
    const timeOut = empObj.timeOutEvents.find(timeOutEvent => {return timeOutEvent.date === date;
    }).hour;

    let hoursWorked = (timeOut - timeIn)/ 100;
    return hoursWorked
}

function wagesEarnedOnDate(empObj, date){
    return hoursWorkedOnDate(empObj, date) * empObj.payPerHour
}

function allWagesFor(empObj){
    let availDates = empObj.timeInEvents.map(timeEvent => {return timeEvent.date})
    let wageReducer = availDates.reduce(function(total, date){
        return total + wagesEarnedOnDate(empObj, date)

    }, 0)
    return wageReducer
}

function calculatePayroll(empRecordsArr){
    return empRecordsArr.reduce(function(total, record){
        return total + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(name => { return name.firstName === firstName});
}