// Variables
const currentDay = moment().format("dddd, MMMM Do");
const workHours = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
];
const militaryHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const currentHour = moment().hour();

// Update header with formatted current day
$("#currentDay").text(currentDay);

// Create row for each hour of the day
for (i = 0; i < workHours.length; i++) {
  let row = $("<div class='row'>");
  let timeHour = $("<div class='hour col-1'>").text(workHours[i]);
  let timeBlock = $("<textarea class='time-block col-10'>").attr("id", i);

  if (currentHour === militaryHours[i]) {
    timeBlock.addClass("present");
  } else if (currentHour > militaryHours[i]) {
    timeBlock.addClass("past");
  } else {
    timeBlock.addClass("future");
  }
  let savBtnIcon = $("<i class='fas fa-save fa-2x'>");
  let saveBtn = $("<button class='saveBtn col-1'>")
    .attr("data-id", i)
    .append(savBtnIcon);

  row.append(row, timeHour, timeBlock, saveBtn);

  $(".container").append(row);
}

// Save text block data to local storage
$(".saveBtn").on("click", function () {
  let buttonId = $(this).attr("data-id");
  let event = $("#" + buttonId).val();
  let taskObj = JSON.parse(localStorage.getItem("task")) || [];
  taskObj.push({
    time: buttonId,
    description: event,
  });
  // add to local storage
  localStorage.setItem("task", JSON.stringify(taskObj));
});

// Load any data from local storage
$(document).ready(function () {
  let savedTasks = JSON.parse(localStorage.getItem("task"));
  for (let i = 0; i < savedTasks.length; i++) {
    //console.log(savedTasks[i].time);
    let updatedHour = savedTasks[i].time;
    let updatedText = savedTasks[i].description;
    $("#" + updatedHour).text(updatedText);
  }
});
