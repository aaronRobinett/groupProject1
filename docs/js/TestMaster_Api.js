//Ideally set to be main code for Ticket Master api

//main js site for ticketmaster
var apiKey= "f98Ap38uGlPtK0V8IYHcVxCE3Je9rta7";
var page = 0;
var userInputEl = document.querySelector('#userInput');
//Event listener for user's input
//document.querySelector('#search-form').addEventListener('submit', myFunction);
//document.querySelector('#search-form').addEventListener('click', myFunction);

function getEvents(page) {

    $('#events-panel').show();
    $('#attraction-panel').hide();
  
    if (page < 0) {
      page = 0;
      return;
    }
    if (page > 0) {
      if (page > getEvents.json.page.totalPages-1) {
        page=0;
      }
    }
}
//function myFunction(){
 var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=portlandoregon&apikey=FwIuELb0CG2cLv87eAxFMrXhhAOqSNHA&size=15&page=";//+page;

 async function getapi(url) {
     //storing response
     var response = await fetch(url);
     //storing json data
     var data =await response.json();
     console.log(data);
     if (response) {
         hideloader();
     }
     show(data);
    
 }
//calling async function
getapi(api_url);

//hide loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

/*
function showEvents(json) {
    var items = $('#events .list-group-item');
    items.hide();
    var events = json._embedded.events;
    var item = items.first();
    for (var i=0;i<events.length;i++) {
      item.children('.list-group-item-heading').text(events[i].name);
      item.children('.list-group-item-text').text(events[i].dates.start.localDate);
      try {
        item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
      } catch (err) {
        console.log(err);
      }
      item.show();
      item.off("click");
      item.click(events[i], function(eventObject) {
        console.log(eventObject.data);
        try {
          getAttraction(eventObject.data._embedded.attractions[0].id);
        } catch (err) {
        console.log(err);
        }
      });
      item=item.next();
    }
  } */