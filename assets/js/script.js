$(function () {
  var hourIds = ["#hour-9", "#hour-10", "#hour-11", "#hour-12", "#hour-13", "#hour-14", "#hour-15", "#hour-16", "#hour-17"];

  var saveButton = $('.saveBtn');
  
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

  saveButton.on('click', saveEvent);

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
  
  for(i = 0; i < localStorage.length; i++){
    var eventInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var id = "#"+eventInfo.eventId
    $(id).children(".description").text(eventInfo.eventDescription);
    console.log(id)
  }

  var date = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(date);
});
