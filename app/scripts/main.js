'use strict';

$(document).ready(function() {

	// Add FourSquare authentication and what not
	// Add the 'query' value from the form
    var fsqData = {
		client_id: 'CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW',
		client_secret: 'IH3SNJ2GDP4M5OLESLWW5D23BV35TMNCUNOX3BES4RQ1O4GD',
		v: '20140806',
		// section: 'drinks',
		limit: 10,
		intent: 'browse',
		// ll: latitude+','+longitude
	};

	// Put the JSON into a string
	var fsqEncoded = $.param(fsqData);

	$('#flySoloForm').submit( function() {

		// I feel that I shouldn't need to have the & there...
		var formData =  '&' + $('#flySoloForm').serialize();

		// Clear the list
		$('.items').children().remove();

		// Check the query
		console.log(fsqEncoded + formData);

		// Request info from Foursquare
		$.ajax({
			url: 'https://api.foursquare.com/v2/venues/search',
			method: 'GET',
			data: fsqEncoded + formData,
		})
		.done( function(data) {
			console.log(data);
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