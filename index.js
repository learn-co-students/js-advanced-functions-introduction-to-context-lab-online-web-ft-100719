const createEmployeeRecord = infoArray => {
  const employee = {
      firstName: infoArray[0],
      familyName: infoArray[1],
      title: infoArray[2],
      payPerHour: infoArray[3],
      timeInEvents: [],
      timeOutEvents: []
  }
  return employee
}

const createEmployeeRecords = employeesInfoArray => {
  return employeesInfoArray.map(createEmployeeRecord)
}

const createTimeInEvent = function(record, timeStamp) {
  const [date, hour] = timeStamp.split(" ")
  const timeEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
  }
  record.timeInEvents.push(timeEvent)
  return record
}

const createTimeOutEvent = function(record, timeStamp) {
  const [date, hour] = timeStamp.split(" ")
  const timeEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
  }
  record.timeOutEvents.push(timeEvent)
  return record
}

const hoursWorkedOnDate = function(record, date) {
  const validateDate = inputDate => inputDate.date.match(date)
  const timeIn = record.timeInEvents.find(validateDate)
  const timeOut = record.timeOutEvents.find(validateDate)
  const hourIn = parseInt(timeIn.hour)/100
  const hourOut = parseInt(timeOut.hour)/100
  return hourOut - hourIn
}

const wagesEarnedOnDate = function(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

const calculatePayroll = employeesArray => {
  return employeesArray.reduce((total, cur) => total + allWagesFor(cur), 0)
}

const findEmployeeByFirstName = (employeesArray, firstName) => {
  return employeesArray.find(employee => employee.firstName === firstName)
}

const allWagesFor = function(employee) {
  const allDates = employee.timeOutEvents.map(event => event.date)
  return allDates.reduce((wages, date) => {
    return wages + wagesEarnedOnDate(employee, date)
  }, 0)
}