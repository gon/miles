var directionsDisplayPath;
var directionsServicePath = new google.maps.DirectionsService();
var map;
var currentLocation = kOriginLocation;
var kOriginLocation = "origin";
var kDestinationLocation = "destination";
var _origin;
var _destination;

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
  google.maps.event.addListener(map, 'click', function(mouseEvent) {getClickLocation(mouseEvent.latLng);});
  
  directionsDisplayPath.setMap(map);
}

function getClickLocation(latLng)
{
  var location = currentLocation;
  var point = new google.maps.LatLng(latLng.lat(), latLng.lng());
  
  switch (currentLocation)
  {
    case kOriginLocation:
      _origin = point;
      location = kDestinationLocation;
      break;
    case kDestinationLocation:
      _destination = point;
      location = kOriginLocation;
      break;
  }
  
  // Put a marker on the map
  setMarker(point, currentLocation, map);
  
  currentLocation = location;
  
  // If both an origin and destination have been submitted
  // send the points to the route-getting method
  if (_origin && _destination)
  {
    // TODO get the route 
  }
  
}

function setMarker (point, type, mapForPointer)
{
  var marker = new google.maps.Marker({
      position: point,
      title:type
  });
  
  // To add the marker to the map, call setMap();
  marker.setMap(mapForPointer);
}

function displayRoute (route)
{

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