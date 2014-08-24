$(document).ready(function() {

	var latitude, longitude;

	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(searchFoursquare);
    } else { 
        $('#userLocation').html('Geolocation is not supported by this browser.');
    }

});

function searchFoursquare(position) {

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
    
    // This is probably not the correct way to do this
	var query_val = $('#flySoloForm').serialize() + $('#queryInput').val();

	// Add FourSquare authentication and what not
	// Get the users lat/lon
	// Add the 'query' value from the form
    var fsq_data = { 
		client_id: 'CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW',
		client_secret: 'IH3SNJ2GDP4M5OLESLWW5D23BV35TMNCUNOX3BES4RQ1O4GD',
		v: '20130815',
		ll: latitude+','+longitude,
		query: query_val
	};

	var fsq_encoded = $.param(fsq_data);	


	$('#flySoloForm').submit( function( event ) {

		console.log(fsq_encoded);
		$.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			method: 'GET',
			data: fsq_encoded,
		})
		.done( function(data) {
			console.log(data);
			var items = [];
			var places = data.response.venues;
			$.each( places, function(key,val) {
				var title = val.name;
				$('.items').append('<li>' + title + '</li>');
			} );
		});
	
		return false;
	
	});

	$('#userLocation').html('Latitude: ' + latitude + '<br>Longitude: ' + longitude);

}