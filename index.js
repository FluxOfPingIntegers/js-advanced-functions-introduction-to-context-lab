// Your code here
function createEmployeeRecord(empArray) {
  let empRecord = {};
  empRecord.firstName = empArray[0];
  empRecord.familyName = empArray[1];
  empRecord.title = empArray[2];
  empRecord.payPerHour = empArray[3];
  empRecord.timeInEvents = [];
  empRecord.timeOutEvents = [];
  return empRecord;
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(empArray => createEmployeeRecord(empArray));
}

function createTimeInEvent(empRecord, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');
  empRecord.timeInEvents.push( { type: "TimeIn", hour: parseInt(hour, 10), date } );
  return empRecord;
}

function createTimeOutEvent(empRecord, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');
  empRecord.timeOutEvents.push( { type: "TimeOut", hour: parseInt(hour, 10), date } );
  return empRecord;
}

function hoursWorkedOnDate(empRecord, date) {
  let timeIn = empRecord.timeInEvents.find(timeInEvent => timeInEvent.date == date)
  let timeOut = empRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date == date)
  return (timeOut.hour - timeIn.hour) / 100;
}

function  wagesEarnedOnDate(empRecord, date) {
  return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour;
}

function allWagesFor(empRecord) {
  let timeInDates = empRecord.timeInEvents.map( (timeIn) => {return timeIn.date});
  return timeInDates.reduce( (accumulator, currentValue) => {return accumulator + wagesEarnedOnDate(empRecord, currentValue)}, 0)
}

function calculatePayroll(empRecords) {
  return empRecords.reduce((accumulator, currentValue) => {return accumulator + allWagesFor(currentValue)}, 0);
}

function findEmployeeByFirstName(empRecords, name) {
  return empRecords.find(empRecord => empRecord.firstName == name)
}