// Your code here
const createEmployeeRecord = employeeArray => {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employeeArray => {
    return employeeArray.map(n => {
        return createEmployeeRecord(n)
    })
}

const createTimeInEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

const createTimeOutEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const timeInEvent = employee.timeInEvents.find(n => n.date === date)
    const timeOutEvent = employee.timeOutEvents.find(n => n.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

const allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map(n => n.date)
    return dates.reduce((x, date) => x + wagesEarnedOnDate(employee, date), 0)
}

const findEmployeeByFirstName = (employeeArray, firstName) => {
    return employeeArray.find(n => n.firstName === firstName)
}


const calculatePayroll = (employeeArray) => {
    return employeeArray.reduce(function(total, employee){
        return total + allWagesFor(employee);
    }, 0);
}

