// Your code here
function createEmployeeRecord(info){
  return {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}

function createEmployeeRecords(employeeInfo){
  return employeeInfo.map(createEmployeeRecord)
}

function createTimeInEvent(record, dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = dateStamp.split(' ')[1]

  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time,10),
    date
  })
  return record
}

function createTimeOutEvent(record, dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = dateStamp.split(' ')[1]

  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time,10),
    date
  })
  return record
}


function hoursWorkedOnDate(record, dateOf){
  let inEvent = record.timeInEvents.find(function(e){
    return e.date === dateOf
  })

  let outEvent = record.timeOutEvents.find(function(e){
    return e.date === dateOf
  })
  let hoursWorked = (outEvent.hour - inEvent.hour)/100
  return hoursWorked
}

function wagesEarnedOnDate(record, dateOf){
  let wage = hoursWorkedOnDate(record, dateOf) * record.payPerHour
  let intWage = parseInt(wage, 10)
  return intWage
}


function allWagesFor(record){
  let dates = record.timeInEvents.map(function(e){ return e.date})
  let allWages =dates.reduce(function(wages, date){ return wages + wagesEarnedOnDate(record, date)},0)
  return allWages
}


let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
