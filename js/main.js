$(document).ready(function(){
	var lat,lng;
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


$('.location').keypress(function (e) {
  if (e.which == 13) {
    $('#submit').click();
  }
});

$("#submit").click(function(){
	var address = $('.location').val();
	 var geocoder = new google.maps.Geocoder();

      if (geocoder) {
         geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
	         
              lat = results[0].geometry.location.k;
              lng = results[0].geometry.location.B;
           
           	getVenues(lat, lng);              

            } 
            else {
              console.log('No results found: ' + status);
            }
         });
      }

});

function getVenues(latitude, longitude)
{

$.getJSON('https://api.foursquare.com/v2/venues/search?client_id=W3BDCS3X5UJM4LOU23B11OFFREDRJERTITLVCGNX1BASQXD3&client_secret=NQX4QLCGUXYRX5GTPKJQCWYZQWTP5ZIYNINMJPVSGO3ZLWCP%20&v=20130815%20&ll=' + lat + ',' + lng + '%20&query=restaurant',
    function(data) {
        $.each(data.response.venues, function(i,venues){
            content = '<p>' + venues.name + '</p>';
            $(content).appendTo("#results").fadeIn(1000);
            console.log(content);
       });
});

}

});

