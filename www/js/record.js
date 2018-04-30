Backendless.initApp("4603F19C-56B8-C0BB-FFEA-7A5654034C00","25741F1D-DB9E-EE41-FFFF-8225E20C4500");



$(document).on("pageshow","#pageone", onPageShow);



function onPageShow() {
	console.log("page shown");
    var queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy( ["created"] );
    Backendless.Data.of("ALARMS").find(queryBuilder).then(processResults).catch(error);
} 





function processResults(tasks) {
   //display the first task in an array of tasks. 


$("#alarmList").empty();

for (var i=0; i<tasks.length; i++){
    $("#alarmList").append("<li>"+alarms[i].Test1+"</li>");
}

$("#alarmList").listview("refresh");  
      
}



function saved(savedTask) {
    console.log( "new Contact instance has been saved" + savedTask);
}

function error(err) {
    alert(err);
}





$(document).on("click", "#submitButton", onAddTask);

function onAddTask() {
		console.log("add task button clicked");
    
    var alarmtext = $("#result").val();

    var newAlarm = {};
    newAlarm.Test1 = alarmtext;
        
    Backendless.Data.of("Alarms").save(newAlarm).then(saved).catch(error); 
	
    location.reload();
}

   


