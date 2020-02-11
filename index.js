// Your code here
function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(collection) {
    let employees = []
    collection.forEach(employee => {
        employees.push(createEmployeeRecord(employee))
    });
    return employees
}

function createTimeInEvent(employee, time) {
    let event = {
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, time) {
    let event = {
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date == date)

    let timeOut = employee.timeOutEvents.find(event => event.date == date)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)

    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents

    let allWages = dates.map(date => wagesEarnedOnDate(employee, date.date))

    return allWages.reduce((a, c) => a + c, 0)
}

function findEmployeeByFirstName(array, name) {
    return array.find(employee => employee.firstName == name)
}

function calculatePayroll(array) {
    let allWages = array.map(employee => allWagesFor(employee))
    return allWages.reduce((a, c) => a + c, 0)
}