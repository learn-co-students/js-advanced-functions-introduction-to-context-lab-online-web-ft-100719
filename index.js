function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

const createEmployeeRecords = employees => {
  return employees.map(employee => {
    return createEmployeeRecord(employee);
  });
};

const createTimeInEvent = (employeeRecord, dateTime) => {
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  });
  return employeeRecord;
};

const createTimeOutEvent = (employeeRecord, dateTime) => {
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  });
  return employeeRecord;
};

const hoursWorkedOnDate = (employeeRecord, date) => {
  const startTime = employeeRecord.timeInEvents.find(timeInEvent => {
    return timeInEvent.date === date;
  }).hour;
  const endTime = employeeRecord.timeOutEvents.find(timeOutEvent => {
    return timeOutEvent.date === date;
  }).hour;
  return (endTime - startTime) / 100;
};

const wagesEarnedOnDate = (employeeRecord, date) => {
  return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
};

const allWagesFor = employeeRecord => {
  return employeeRecord.timeInEvents
    .map(timeInEvent => {
      return wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    })
    .reduce((acc, memo) => {
      return acc + memo;
    });
};

const calculatePayroll = employees => {
  return employees
    .map(employee => {
      return allWagesFor(employee);
    })
    .reduce((acc, memo) => {
      return acc + memo;
    });
};

const findEmployeeByFirstName = (employees, firstName) => {
  return employees.find(employee => {
    return employee.firstName === firstName;
  });
};
