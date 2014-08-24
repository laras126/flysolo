$(document).ready(function() {

	// var latitude, longitude;

// 	if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(searchFoursquare);
//     } else { 
//         $('#userLocation').html('Geolocation is not supported by this browser.');
//     }

// });

// function searchFoursquare(position) {

	// var latitude = position.coords.latitude;
	// var longitude = position.coords.longitude;

	// Add FourSquare authentication and what not
	// Add the 'query' value from the form
    var fsq_data = { 
		client_id: 'CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW',
		client_secret: 'IH3SNJ2GDP4M5OLESLWW5D23BV35TMNCUNOX3BES4RQ1O4GD',
		v: '20140806',
		// section: 'drinks',
		limit: 10,
		intent: 'browse',
		// ll: latitude+','+longitude
	};

	// Put the JSON into a string
	var fsq_encoded = $.param(fsq_data);

	$('#flySoloForm').submit( function(event) {

		// I feel that I shouldn't need to have the & there...
		var form_data =  '&' + $('#flySoloForm').serialize();

		// Clear the list
		$('.items').children().remove();
		
		// Check the query
		console.log(fsq_encoded + form_data);
		
		// Request info from Foursquare
		$.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			method: 'GET',
			data: fsq_encoded + form_data,
		})
		.done( function(data) {
			console.log(data);
			var items = [];
			var places = data.response.venues;
			$.each( places, function(key,val) {
				var title = val.name;
				$('.items').append('<li>' + title + '</li>');
			} );
		})
		.fail( function(error) {
			$('.items').append('<li>' + error + '</li>');
		});
		
		$('#form-status').html('Here are some options!');
		
		return false;
	
	});

});

// }