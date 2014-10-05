// Much inspired by this tutorial from Blueprint Interactive:
// http://blueprintinteractive.com/blog/html5-geolocation-venue-search-powered-foursquare-and-retina-maps

'use strict';

$(function() {
	
	// Set up some variables
	var lat = '';
    var lng = '';
	var results = '';
	var str = '';
	var newstr = '';
	var phone = '';
	var rating = '';
	var icon = '';
	var address = '';

	var loader = '<div class="spinner"></div>';

    // When the form is submitted
	$('#flySoloForm').submit( function() {

		// Clear the form and show the loader
		$('#venues').html(loader);

		// Prevent default form functionality
		event.preventDefault();

		// Do we have the location yet?
		// If no, get the location
		if (!lat) {
			navigator.geolocation.getCurrentPosition(getLocation);
		// If yes i.e. the form has already been submitted once, go ahead and get the Foursquare venues
		} else {
			getVenues();
		}
	});

	function getLocation(position) {
		// Get latitude and longitude
  		lat = position.coords.latitude;
  		lng = position.coords.longitude;

  		console.log(lat + ', ' + lng);
  		// Get the FourSquare venues
		getVenues();
	}

	function getVenues() {

		// Request info from Foursquare
		$.ajax({
			type: 'GET',
	  		url: 'https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lng+'&limit=5&client_id=CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW&client_secret=IH3SNJ2GDP4M5OLESLWW5D23BV35TMNCUNOX3BES4RQ1O4GD&v=20140619&query='+$('#query').val(),

	  		// If the request is successful:
			success: function(data) {
				
				$("#venues").html('');

				var places = data.response.groups[0].items;
				
				$.each( places, function() {
					
					var phone = '';

					if (this.venue.contact.formattedPhone) {
						phone = "Phone:"+this.venue.contact.formattedPhone;
						// console.log(phone);
					} else {
						phone = '';
					}

					if (this.venue.location.address) {
						address = '<p class="subinfo">'+this.venue.location.address+'<br>';
					} else {
						address = '';
					}
					
					if (this.venue.rating) {
						rating = '<span class="rating">'+this.venue.rating+'</span>';
					}
					
					results = '<li class="venue"><h2><span>'+this.venue.name+'</h2>'+address+phone+rating+'</p></li>';
					
					$("#venues").append(results);

				});
			}
		});
	}

});