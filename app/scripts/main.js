'use strict';

$(document).ready(function() {

	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore?client_id=CKSDM1KYCKKBSXJUFZWW2PWB0YZRN0FPMQIRX0IL2UWHMCPW&client_secret=RTQWFLNZS4BYGOUU4MEKOXSFUZPU1PIJ4XP3HNYRZPBVVWDD&v=20130815&ll=40.7,-74&query=cocktail',
		
		success: function( data ) {
			console.log(data.response.venues);
			var items = [];
			var places = data.response.venues;
			$.each( places, function(key,val) {
				var title = '<h3>'+val.name+'</h3>';
				var phone = '<p>'+val.contact.phone+'</p>';

				$('.items').append('<li>' + title + phone +'</li>');
			} );
		}
	});

});

