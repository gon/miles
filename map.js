var directionsDisplayPath;
var directionsServicePath = new google.maps.DirectionsService();
var map;

function initializePathMap()
{
  directionsDisplayPath = new google.maps.DirectionsRenderer();
  var user = new google.maps.LatLng(37.7779, -122.4330);
  var myOptions =
  {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: user
  }
  
  map = new google.maps.Map(document.getElementById("main_map"), myOptions);
  
  // Add click event to map
  // in order to identify the user's beginning and end locations
  google.maps.event.addListener(map, 'click', function(event) {getLocation(event);});
  
  directionsDisplayPath.setMap(map);
}

function getLocation(LatLng)
{
  alert(LatLng);
}

function calcPathRoute() {
 	  
	  var waypts = [];
	  var routeDrivers = 0;
	  
	  var haveDriver = false;
	  for (var i = 0 ; i < drivers.length ; i++) {
	  	var driver = drivers[i];
	  	if (driver.role == "driver") {
	  		routeDrivers++;
	  		var start = driver.originStreet + ", " + driver.originCity;
	  		var end = driver.destinationStreet + ", " + driver.destinationCity;
	  		var haveDriver = true;
	  	}
	  	if (driver.role == "passenger") {
	  		routeDrivers++;
	  		waypts.push({
	  		    location:driver.originStreet + ", " + driver.originCity,
	  		    stopover:true
	  		});
	  		waypts.push({
	  		    location:driver.destinationStreet + ", " + driver.destinationCity,
	  		    stopover:true
	  		});
	  	}  
	  }
	  
	  if (haveDriver) {
	  	
	  	var request = {
	  	    origin: start,
	  	    destination: end,
	  	    waypoints: waypts,
	  	    optimizeWaypoints: true,
	  	    travelMode: google.maps.TravelMode.DRIVING
	  	};
	  	
	  	directionsServicePath.route(request, function(response, status) {
	  	  if (status == google.maps.DirectionsStatus.OK) {
	  	    directionsDisplayPath.setDirections(response);
	  	    //google.maps.event.trigger(map, 'resize');
	  	    var legs = response.routes[0].legs;
	  	    var distance = 0;
	  	    var duration = 0;
	  	    for (var i = 0 ; i < legs.length ; i++) {
	  	    	if (legs[i].distance.value != 'undefined') {distance += legs[i].distance.value;}
	  	    	else { distance = "Carma can't determine the distance";}
	  	    	if (legs[i].duration.value != 'undefined') {duration += legs[i].duration.value;}
	  	    	else { duration = "Carma can't determine the distance";}
	  	    }
	  	    
	  	    setPathHeaderInfo(distance, duration, routeDrivers);
	  	    
	  	  }
	  	});
	  	
	  } else {
  	
  		var routeDrivers = 0;
  		setPathHeaderInfo(0, 0, routeDrivers);
  	
  	}
}
 
 function setMapWidth () {
 
	var mapCanvasWidth = $(window).width() - $("#path_selection_table").width() - 2 - 2;
	var mapCanvasHeight = $("#path_view").height();
	$("#path_map_canvas").css({"width" : mapCanvasWidth, "height" : mapCanvasHeight});		
 
 }