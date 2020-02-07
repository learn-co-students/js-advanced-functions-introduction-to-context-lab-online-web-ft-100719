// Your code here
function createEmployeeRecord(array) {
  let employee = {}
  employee.firstName = array[0]
  employee.familyName = array[1]
  employee.title = array[2]
  employee.payPerHour = array[3]
  employee.timeInEvents = []
  employee.timeOutEvents = []
  return employee
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, timeInString) {
  employee.timeInEvents.push(createTimeEvent(timeInString, "TimeIn"))
  return employee
}

function createTimeEvent(timeString, typeString) {
  return Object.assign(extractTimeData(timeString), { type: typeString })
}
function extractTimeData(timeString) {
  const timeArray = timeString.split(' ')
  return {
    date: timeArray[0],
    hour: parseInt(timeArray[1])
  }
}

function createTimeOutEvent(employee, timeOutString) {
  employee.timeOutEvents.push(createTimeEvent(timeOutString, "TimeOut"))
  return employee
}

function hoursWorkedOnDate(employee, date) {
  const timeInOnDate = employee.timeInEvents.find(e => e.date === date)
  const timeOutOnDate = employee.timeOutEvents.find(e => e.date === date)
  return (timeOutOnDate.hour - timeInOnDate.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
    if (hoursWorkedOnDate(employee, timeInEvent.date)) {
      totalWages += wagesEarnedOnDate(employee, timeInEvent.date)
    }
    return totalWages
  }, 0)
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce((totalPayroll, employee) => {
    totalPayroll += allWagesFor(employee)
    return totalPayroll
  }, 0)
}

function findEmployeeByFirstName(arrayOfEmployees, employeeFirstName) {
  return arrayOfEmployees.find(e => e.firstName === employeeFirstName)
}