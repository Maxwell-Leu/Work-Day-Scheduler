$(function () {
  // List of all of the ids for the hours of the work day
  var hourIds = ["#hour-9", "#hour-10", "#hour-11", "#hour-12", "#hour-13", "#hour-14", "#hour-15", "#hour-16", "#hour-17"];

  // Targets all save buttons
  var saveButton = $('.saveBtn');
  
  // Saves inputed text in local storage. Objects are named after the hour of the work day.
  function saveEvent(event){
    event.preventDefault();
    var key = $(this).parent().attr('id')
    var eventInfo = {
        eventId: $(this).parent().attr('id'),
        eventDescription: document.querySelector('.description').value
    }
    console.log()
    localStorage.setItem(key, JSON.stringify(eventInfo));
  }

  // Buttons run save event on click
  saveButton.on('click', saveEvent);

  // Gets the current hour of the day on page load
  var hourOfDay = dayjs().get('hour');

  // Checks to see which time slots need to be changed off of their defualt state
  for(i = 0; i < hourIds.length; i++){
    var changeToPast = document.querySelector(hourIds[i]);

    if(hourOfDay == hourIds[i].split("-")[1]){
      if(changeToPast.classList.contains('future')){
        changeToPast.classList.remove('future');
        changeToPast.classList.add('present');
      }
    }

    if(hourOfDay > hourIds[i].split("-")[1]){
      
      if (changeToPast.classList.contains('present')){
        changeToPast.classList.remove('present');
        changeToPast.classList.add('past');
      }else if(changeToPast.classList.contains('future')){
        changeToPast.classList.remove('future');
        changeToPast.classList.add('past');
      }
    }
  }
  
  // Parses through local storage to display saved events
  for(i = 0; i < localStorage.length; i++){
    var eventInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var id = "#"+eventInfo.eventId
    $(id).children(".description").text(eventInfo.eventDescription);
    console.log(id)
  }

  // Shows current date
  var date = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(date);
});
