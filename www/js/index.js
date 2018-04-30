 var watchID = navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);
navigator.geolocation.getCurrentPosition(posSuccess, posError, posOptions);


$(document).on("pagecreate","#pageone",function(){
  $('#submitButton').on("click", function(){
    testfunction();  
 
  });            
});            





function testfunction() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
    
    var origin_input = document.getElementById('start');
	var destination_input = document.getElementById('end');
	
    
    var autocomplete_origin = new google.maps.places.Autocomplete(origin_input); 
	var autocomplete_destination = new google.maps.places.Autocomplete(destination_input);     
  

  directionsDisplay.setPanel(document.getElementById('right-panel'));
     
   
  var control = document.getElementById('right-panel');
  control.style.display = 'block';
  

  var onChangeHandler = function() {
     
    calculateAndDisplayRoute(directionsService, directionsDisplay);
   
  };
  
  document.getElementById('submitButton').addEventListener('click', onChangeHandler);

}
google.maps.event.addDomListener(window, 'load', testfunction);

function calculateAndDisplayRoute(directionsService, directionsDisplay, ) {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
var date = document.getElementById('mydate').value    
 var time = document.getElementById('mytime').value;
    
    var date_obj = new Date(date + " " + time);
    

    
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

