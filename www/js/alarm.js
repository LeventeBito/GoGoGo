var secondsRemaining;
var intervalHandle;



function resetPage(){

	document.getElementById("alarmCl").style.display = "block";

}

function tick(){
    // grab the h1
	var timeDisplay = document.getElementById("time");
	
	// turn the seconds into mm:ss
    var hou = Math.floor((secondsRemaining/60)/60);
	var min = Math.floor(secondsRemaining / 60) - (hou * 60);
	var sec = secondsRemaining - (hou *60 * 60) - (min * 60);
    
 console.log(secondsRemaining + " -- " + hou + " -- " + min+ " -- " + sec);
	//add a leading zero (as a string value) if seconds less than 10
	if (sec < 10) {
		sec = "0" + sec;
	}

	// concatenate with colon
	var message =  hou.toString() + ":" + min.toString() + ":" + sec;

	// now change the display
	timeDisplay.innerHTML = message;

	// stop is down to zero
	if (secondsRemaining === 0){
		alert("Done!");
		clearInterval(intervalHandle);
		resetPage();
	}

	//subtract from seconds remaining
	secondsRemaining--;

}

function startCountdown(){

	function resetPage(){
		document.getElementById("alarmCl").style.display = "block";
	}

	// get countents of the "minutes" text box
   
	var minutes = document.getElementById("alarmCl").value;
    var parMin = parseInt(minutes);
  
    
    
    var currentDate = document.getElementById("mydate").value;
    var currentTime = document.getElementById("mytime").value;
    var date_obj = Date.parse(currentDate +" "+ currentTime);
    var another = parseFloat(currentTime);
    console.log(date_obj);
    var date_min = Math.floor(date_obj/60000).toFixed(1);
    console.log("Time in mins "+date_min);
    console.log("Hours: " + another + "Minutes: " + parMin )
 
    
    
    var d = new Date();
    var x = Date.parse(d);
    var date_mx = Math.floor(x/60000).toFixed(1);
    
    
    var diff = (date_min-date_mx);
    console.log("Diff in mins1 "+diff);
   
   
    var total = (diff-parMin);
    console.log("Diff in mins2 "+total);
	
    
	// check if not a number
	if (isNaN(minutes)){
		alert("Please enter a number");
		return; // stops function if true
	}

	// how many seconds
	secondsRemaining = total * 60;
	
	//every second, call the "tick" function
	// have to make it into a variable so that you can stop the interval later!!!
	intervalHandle = setInterval(tick, 1000);

	// hide the form
	//document.getElementById("inputArea").style.display = "none";
    var Display2 = document.getElementById("time2");

    if (parMin === 60){
        parMin="00";
    }
   
     var message2 =  (another-1) + " : " +   parMin ;
   

	// now change the display
	Display2.innerHTML = message2;
     console.log(message2);
}



window.onload = function(){
$("#col1").hide();
	
	//create a button
	var startButton = document.getElementById("submitButton");
	
	startButton.onclick = function(){
		startCountdown();
          $('#col1').show();
        $("#time").hide();
       
        
	};

}