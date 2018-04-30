//It grabs the location of the device.
var watchID = navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);
navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);

/*
On clicking the submit button, the testfunction function is called.
*/
$(document).on("pagecreate","#pageone",function(){
  $('#submitButton').on("click", function(){
    testfunction();  
 
  });            
});            




//the main function of the code
function testfunction() {
//Two google services are stored as a variable.    
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;

//It stores two elements from the form as a variable.    
  var origin_input = document.getElementById('start');
  var destination_input = document.getElementById('end');

//It autofills the Start and End element with address when anything is typed in.    
  var autocomplete_origin = new google.maps.places.Autocomplete(origin_input); 
  var autocomplete_destination = new google.maps.places.Autocomplete(destination_input);     
  
//It sets up a Panel.
  directionsDisplay.setPanel(document.getElementById('right-panel'));
     
//The Panel from the form. 
  var control = document.getElementById('right-panel');
  control.style.display = 'block';
  

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
 //On clicking the submit Button calculateAndDisplayRoute is called. 
  document.getElementById('submitButton').addEventListener('click', onChangeHandler);

}
//when the page is loaded calculateAndDisplayRoute function is loaded.
google.maps.event.addDomListener(window, 'load', testfunction);

function calculateAndDisplayRoute(directionsService, directionsDisplay, ) {
//Form elements from page two.    
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var date = document.getElementById('mydate').value    
  var time = document.getElementById('mytime').value;
  var date_obj = new Date(date + " " + time);
    
  /*Google Direction Service plans the route 
  with Public Transport based on the Time, Date, Start and Finish Point.*/  
    directionsService.route({
        origin: start,
        destination: end,   
        travelMode: 'TRANSIT',
        transitOptions : {
            departureTime: date_obj 
        }
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      console.log(response);
    } else {
      //window.alert('Directions request failed due to ' + status);
    }
  });  
}

var geocoder = new google.maps.Geocoder();
var API_KEY = `AIzaSyAn__qjdqcfvl6zXthkIeltbb-8wmEPmgY`;



//-- Geolocation --
var posOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
/*
This function is responsible for autofill 
the start element of the form with address 
where the device is located.
*/
function posSuccess(pos) {
  var crd = pos.coords;
  var API_KEY = `AIzaSyAn__qjdqcfvl6zXthkIeltbb-8wmEPmgY`;
  var geo_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&key=${API_KEY}`;

     console.log(geo_url);
    
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  
  fetch(geo_url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        return;
      }
        
      response.json().then(function(data) {
      console.log(data);
      document.getElementById('start').value = data.results[0].formatted_address;
      console.log(data.results);
      });
    }
  )
};

function posError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

