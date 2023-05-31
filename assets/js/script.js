// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var hourIds = ["#hour-9", "#hour-10", "#hour-11", "#hour-12", "#hour-13", "#hour-14", "#hour-15", "#hour-16", "#hour-17"];
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveButton = $('.saveBtn');
  
  function saveEvent(event){
    event.preventDefault();
    var eventInfo = {
        eventId: $(this).parent().attr('id'),
        eventDescription: document.querySelector('.description').value
    }
    console.log()
    localStorage.setItem("eventInfo", JSON.stringify(eventInfo));
  }

  saveButton.on('click', saveEvent);

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var hourOfDay = dayjs().get('hour');

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
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  


  // TODO: Add code to display the current date in the header of the page.
  var date = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(date);
});
