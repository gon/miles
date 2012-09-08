$(document).ready(function() {

	initializePathMap();
	
	$("input").focusout( function() {validateLocation($(this).val());} );

});