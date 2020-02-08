// Your code here
function createEmployeeRecord (employeeRecord) {
    const timeIns = []
    const timeOuts = []
    const record   = {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2], 
        payPerHour: employeeRecord[3],
        timeInEvents: timeIns,
        timeOutEvents: timeOuts,
    }
    return record 
}

function createEmployeeRecords (records) {
    return records.map(employeeInfo => {
        return createEmployeeRecord(employeeInfo)
    })
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const dateHour = dateStamp.split(' ')
    const timeInObject = {
        type: 'TimeIn',
        hour: parseInt(dateHour[1], 10),
        date: dateHour[0],
    }
    employeeRecord.timeInEvents.push(timeInObject)
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    const dateHour = dateStamp.split(' ')
    const timeOutObject = {
        type: 'TimeOut',
        hour: parseInt(dateHour[1], 10),
        date: dateHour[0],
    }
    employeeRecord.timeOutEvents.push(timeOutObject)
    return employeeRecord
}

function hoursWorkedOnDate (employeeRecord, workDate) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === workDate).hour
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === workDate).hour

    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate (employeeRecord, workDate) {
    return hoursWorkedOnDate(employeeRecord, workDate) * employeeRecord.payPerHour
}

function allWagesFor (employeeRecord) {
    const wages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date))
    const totalWages = (wage, startValue) => wage + startValue
    return wages.reduce(totalWages)
}

function findEmployeeByFirstName (employeeRecords, name) {
    return employeeRecords.find(record => record.firstName === name)
}

function calculatePayroll (employeeRecords) {
    const wages = employeeRecords.map(record => allWagesFor(record))
    const totalWages = (wage, startValue) => wage + startValue 
    return wages.reduce(totalWages)
}
