// Your code here
function createEmployeeRecord(empArray) {
    let employee = {
        firstName: empArray[0],
        familyName:empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employee;
    
}

function createEmployeeRecords(arr)
{
    let empRecords = arr.map(createEmployeeRecord)
    return empRecords;
}

function createTimeInEvent(emp, dateStamp)
{
    let timeIn = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)

    }
    
    emp.timeInEvents.push(timeIn);
    return emp;
}

function createTimeOutEvent(emp, dateStamp)
{
    let timeOut = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)

    }
    
    emp.timeOutEvents.push(timeOut);
    return emp;
}

function hoursWorkedOnDate(emp, dateStamp)
{
    let timeIn = emp.timeInEvents.find(e => e.date === dateStamp);
    let timeOut = emp.timeOutEvents.find(e => e.date === dateStamp);
    
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate(emp, dateStamp)
{
    return (emp.payPerHour * hoursWorkedOnDate(emp, dateStamp));
}

function allWagesFor(emp)
{
    let allDates = emp.timeInEvents.map (e => e.date);

    let totalWages = allDates.reduce( 
        (sum, elem) => {
            return sum + wagesEarnedOnDate(emp, elem);
        },0);
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName)
{
    let emp = srcArray.find(e => e.firstName === firstName);
    return emp
}

function calculatePayroll(empRecords)
{
    let total = empRecords.reduce (
        (sum, emp) => {
            return sum + allWagesFor(emp);
    },0);
    return total;
}
