function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(records) {
  return records.map(function (record) {
    return createEmployeeRecord(record)
  })
}

function createTimeInEvent(record, time) {
  let timeTokens = time.split(" ")
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(timeTokens[1]),
    date: timeTokens[0]
  }
  record.timeInEvents.push(timeIn)
  return record
}

function createTimeOutEvent(record, time) {
  let timeTokens = time.split(" ")
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(timeTokens[1]),
    date: timeTokens[0]
  }
  record.timeOutEvents.push(timeOut)
  return record
}

function hoursWorkedOnDate(record, date) {
  let startTime = record.timeInEvents.find(time => time.date == date).hour
  let endTime = record.timeOutEvents.find(time => time.date == date).hour
  return (endTime - startTime) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(employee) {
  let allDates = employee.timeOutEvents.map(function (event) {
    return event.date
  })

  let totalWages = allDates.reduce(function (wages, date) {
    return wages + wagesEarnedOnDate(employee, date)
  }, 0)

  return totalWages
}

function calculatePayroll(employees) {
  return employees.reduce(function (payroll, employee) {
    return payroll + allWagesFor(employee)
  }, 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName == name)
}