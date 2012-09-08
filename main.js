var apiKey = '3a026a0d29b352c7f22aea7bb0ba257d';
var apiPath = 'https://pais-dev.zypr.net/api/v2/';
var routePrefix = 'route_get/';
var authPrefix = 'auth/login/';
var authToken = '';
var deviceId = '';

var authClient = function(){
  var path = apiPath+authPrefix+'?key='+apiKey+'&username=anonymous';
  $.get(path, function(data){
    authToken = authToken.response.data[0].token;
    deviceId = authToken.response.data[0].deviceId;
  });
}

var getRoute = function(firstLat, firstLng, secondLat, secondLng){

  console.log("Getting route from" + this.firstLat + ", " + this.firstLng + " to " + this.secondLat + ", " + this.secondLng);
  var routePoints = {data: [
    {'point': 
      {
        'lat': this.firstLat,
        'lng': this.firstLng
      }
    },
    {'point': 
      {
        'lat': this.secondLat,
        'lng': this.secondLng
      }
    }
  ]};
  $.get(apiPath+routePrefix+routePoints, function(data){
    console.log(data);
  });

};

$(document).ready(function() {

	initializePathMap();
	$("input").focusout( function() {validateLocation($(this).val());} );
  authClient();

});

