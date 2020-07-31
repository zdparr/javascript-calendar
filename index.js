// Variables
const currentDay = moment().format("dddd, MMMM Do");

console.log(currentDay);
// Update header with formatted current day
$("#currentDay").text(currentDay);
