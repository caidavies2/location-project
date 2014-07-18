$(document).ready(function(){
	var lat,lng,radius, query_type;	
    var items = new Array();
    var marker = new Array();
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

$("#results").html('');
radius = $("#radius").val();
query_type = $("#query-type").val();
$.getJSON('https://api.foursquare.com/v2/venues/explore?client_id=W3BDCS3X5UJM4LOU23B11OFFREDRJERTITLVCGNX1BASQXD3&client_secret=NQX4QLCGUXYRX5GTPKJQCWYZQWTP5ZIYNINMJPVSGO3ZLWCP%20&v=20130815%20&ll=' + lat + ',' + lng + '%20&query=' + query_type + '&radius=' + radius,
    function(data) {
      console.log(data.response.groups[0]);

      for (var i = 0; i <9; i++)
      {
        try
        { 
        items[i]=
        [
        {          
          'name': data.response.groups[0].items[i].venue.name,
          'rating': data.response.groups[0].items[i].venue.rating,       
          'price': data.response.groups[0].items[i].venue.price.tier,
          'lat': data.response.groups[0].items[i].venue.location.lat,
          'lng': data.response.groups[0].items[i].venue.location.lng
        }        
        ]      
        }
        catch(e){
          if(e){
            console.log("error");
          }
        }
      }

      items.sort(function(obj1, obj2) {
  // Ascending: first age less than the previous
        return obj2.value - obj1.value;
      });

      console.log(items);

        // console.log(data.response.groups[0].items[i].venue.name);
        // console.log(data.response.groups[0].items[i].venue.rating);
        // console.log(data.response.groups[0].items[i].venue.price.tier);

        for(var iCount = 0; iCount <= items.length; iCount++)
        {          
          marker[iCount] = new google.maps.LatLng(items[iCount][0].lat, items[iCount][0].lng);    
          console.log(items[iCount][0].lat);
          console.log(items[iCount][0].lng);
        }      



});

// $.getJSON('https://api.foursquare.com/v2/venues/search?client_id=W3BDCS3X5UJM4LOU23B11OFFREDRJERTITLVCGNX1BASQXD3&client_secret=NQX4QLCGUXYRX5GTPKJQCWYZQWTP5ZIYNINMJPVSGO3ZLWCP%20&v=20130815%20&ll=' + lat + ',' + lng + '%20&query=restaurant&limit=10&radius=' + radius,
//     function(data) {
//         $.each(data.response.venues, function(i,venues){        	
//             content = '<p>' + venues.name + '</p>';         
//             $(content).appendTo("#results").fadeIn(1000);
//             console.log(content);
//        });
// });

}

});

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}
