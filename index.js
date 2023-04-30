/* Your Code Here */
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }

  function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
  }

function createTimeInEvent(date){
    //const timeStamp = date.split(' ');
    //const timeInObj = {type : "TimeIn", hour : parseInt(timeStamp[1]), date : timeStamp [0],};
    this.timeInEvents.push({type : "TimeIn", hour : parseInt(date.slice(-4)), date : date.slice(0,10)});
    return this;
}

function createTimeOutEvent(date){
    const timeStamp = date.split(' ');
    const timeOutObj = { type : "TimeOut", hour : parseInt(timeStamp[1]), date : timeStamp [0],};
    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour)/100;
  }
  
  function wagesEarnedOnDate(date) {
    const wage = this.payPerHour
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return wage * hoursWorked;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => record.firstName === firstName)
}

function calculatePayroll(employeeRec) {
    const totalForEachEmployee = employeeRec.map(record => allWagesFor.call(record))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
  }