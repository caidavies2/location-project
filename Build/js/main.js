$(document).ready(function(){
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

$(".location").geocomplete();

$("#submit").click(function(){


	var address = $('.location').val();
	 var geocoder = new google.maps.Geocoder();

      if (geocoder) {
         geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log(results[0].geometry.location);
            } 
            else {
              console.log('No results found: ' + status);
            }
         });
      }

});


});

