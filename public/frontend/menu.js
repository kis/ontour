
$(function() {
	
	/**
	 * Fix search line fix clearing for FF. Focus
	 */
	
	$(".search-field").val('').focus();

	/**
	 * Search by enter click
	 * Autocomplete on input characters
	 */

	var label;

	$(".search-field").on({
		keydown: function(e) {

			switch (e.keyCode) {
				case 13:
					//enter - get termin to input and search

					if ($('#autocomplete').has('.selected-termin').toArray().length) {
						$(".search-field").val($('.selected-termin a').text()); 
					} 

					$('.search-button').trigger('click');
					
					$('#autocomplete').hide();

					break;
				case 27:
					//esc - hide autocomplete

					$('#autocomplete').hide();

					break;
				case 38:
					//up

					if ($('#autocomplete').has('.selected-termin').toArray().length) {
						$('.selected-termin').removeClass('selected-termin')
											.prev().addClass('selected-termin');
					} else {

						label = false;

						$('#autocomplete div').each(function() {
							if ($(this).css('backgroundColor') == 'rgb(172, 188, 201)') {
								$(this).css('backgroundColor', 'rgb(252, 248, 227)');
								$(this).prev().addClass('selected-termin');
								label = true;
								return false;
							}
						});

						if (!label) {
							$('#autocomplete div:last').addClass('selected-termin');
						}
					}

					break;
				case 40:
					//down

					if ($('#autocomplete').has('.selected-termin').toArray().length) {
						$('.selected-termin').removeClass('selected-termin')
											.next().addClass('selected-termin');
					} else {

						label = false;

						$('#autocomplete div').each(function() {
							if ($(this).css('backgroundColor') == 'rgb(172, 188, 201)') {
								$(this).css('backgroundColor', 'rgb(252, 248, 227)');
								$(this).next().addClass('selected-termin');
								label = true;
								return false;
							}
						});

						if (!label) {
							$('#autocomplete div:first').addClass('selected-termin');
						}
					}

					break;
				default:
					break;
			}

		},
		input: function(e) {
			var field = $('.search-field'),
				name = field.val(),
				res;

			if (field.attr('id') == 'artist-field') {

				$.ajax({
					url: 'http://ws.audioscrobbler.com/2.0/',
					type: 'GET',
					data: {
						method: 'artist.search',
						artist: name,
						limit: 5,
						api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
						format: 'json'
					},
					success: function(data) {
						if (typeof data != 'undefined') {
							$('#autocomplete')
								.show()
								.children().detach();

							if (field.attr('id') == 'artist-field') {
								res = data.results.artistmatches.artist;
							}

							if (typeof res != 'undefined' && res.length) {
								res.forEach(function(value, index) {
									$('#autocomplete').append('<div><a>' + value.name + '</a></div>');
								});
							}
						}
					}
				});

			} else {

				//city field
				$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+name, function (data) {
					$('#autocomplete')
						.show()
						.children().detach();

					data.length = 10;

					data.forEach(function(value, index) {
						if (value && typeof value != 'undefined') {
							var res = value.split(', ');
							$('#autocomplete').append('<div><a>' + res[0] + '</a> ' + res[2] + '</div>');
						}
					});
				});

			}
		}
	});


	/**
	 * Hide autocomplete on window area click
	 */
	
	$(window).on('click', function() {
		$('#autocomplete').hide();
	});

	/**
	 * Paste search word to input field and hide autocomplete
	 */

	$('#autocomplete').on('click', 'div', function() {
		$(".search-field").val($(this).children().text());
		$('#autocomplete').hide();
		$('.search-button').trigger('click');
	});


	/**
	 * If we have selected area - remove it
	 */

	$('#autocomplete').on('mouseenter', 'div', function() {
		if ($('#autocomplete').has('.selected-termin').toArray().length) {
			$('.selected-termin').removeClass('selected-termin');
		}
	});

	/**
	 * Switch search field/button options for different tabs
	 */

	$('.tab').on('click', function() {

		var $field = $(".search-field");
		var $link = $(".search-button");

		$field.val('').removeClass("invalid");

		$('.tab').removeClass('active');

		switch ($(this).attr('id')) {
			case 'artist-tab':
				$field.attr({'id': 'artist-field', 'placeholder': 'Enter artist name..'}).focus();
				$link.attr('id', 'artist-button');
				$(this).addClass('active');
				break;
			case 'city-tab':
				$field.attr({'id': 'city-field', 'placeholder': 'Enter country or city..'}).focus();
				$link.attr('id', 'city-button');
				$(this).addClass('active');
				break;
			default:
				break;
		}
	});

	/**
	 * Tab control
	 */

	$('.tab-control').on('click', function() {
		$('#sidebar').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
		});

		$('#search-box').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
		});

		$('#controls').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? 0 : 360
		}).find('b').text(parseInt($('#sidebar').css('left'),10) == 0 ? '>' : '<');
	});

	/**
	 * Scrolling event to show Go Top area when we're at the bottom
	 */

	$('#artist-info').on('scroll', function() {
		if ($('#artist-info').scrollTop() > $('#artist-info').height()) {
			$('#go-top').css({
				display: 'block'
			});
		} else {
			$('#go-top').css({
				display: 'none'
			});
		}
	});

	/**
	 * Go Top
	 */

	$('#go-top').on('click', function() {
		$('#artist-info').animate({
			'scrollTop': 0
			}, 500, 'swing');
	});

});