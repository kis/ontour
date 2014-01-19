
$(function() {
	
	/**
	 * Initialize LastFM lib
	 */

	var lastfm = new LastFM({
	    apiKey    : 'dd349d2176d3b97b8162bb0c0e583b1c',
	    apiSecret : '1aaac60ed1acb3d7a10d5b1caa08d116'
	});
	
	/**
	 * Fix search line fix clearing for FF. Focus
	 */
	
	$("input[name='search-field']").val('').focus();

	/**
	 * Search by enter click
	 * Autocomplete on input characters
	 */

	$('input[name="search-field"]').on({
	    keydown: function(e) {

	        switch (e.keyCode) {
	            case 13:
	                //enter - get termin to input and search

	                if ($('#autocomplete').has('.selectedTermin').toArray().length) {
	                    $("input[name='search-field']").val($('.selectedTermin a').text()); 
	                } 

	                $('a[name="search-go"]').trigger('click');

	                break;
	            case 27:
	                //esc - hide autocomplete

	                $('#autocomplete').hide();

	                break;
	            case 38:
	                //up

	                if ($('#autocomplete').has('.selectedTermin').toArray().length) {
	                    $('.selectedTermin').removeClass('selectedTermin')
	                                        .prev().addClass('selectedTermin');
	                } else {
	                	$('#autocomplete div').each(function() {
	                		if ($(this).css('backgroundColor') == 'rgb(172, 188, 201)') {
	                			$(this).css('backgroundColor', 'rgb(252, 248, 227)');
	                			$(this).prev().addClass('selectedTermin');
	                			exit();
	                		}
	                	});

	                    $('#autocomplete div:last').addClass('selectedTermin');
	                }

	                break;
	            case 40:
	                //down

	                if ($('#autocomplete').has('.selectedTermin').toArray().length) {
	                    $('.selectedTermin').removeClass('selectedTermin')
	                                        .next().addClass('selectedTermin');
	                } else {
	                    $('#autocomplete div').each(function() {
                    	if ($(this).css('backgroundColor') == 'rgb(172, 188, 201)') {
                    		$(this).css('backgroundColor', 'rgb(252, 248, 227)');
                    		$(this).next().addClass('selectedTermin');
                    		exit();
                    	}
	                	});

	                    $('#autocomplete div:first').addClass('selectedTermin');
	                }

	                break;
	            default:
	                break;
	        }

	    },
	    input: function(e) {
	        var field = $('input[name="search-field"]'),
	            name = field.val(),
	            term,
	            term_in,
	            res;

	        switch (field.attr('id')) {
	            case 'artistField':
	                term = lastfm.artist;
	                term_in = {artist: name, limit: 10};
	                break;
	            case 'venueField':
	                term = lastfm.venue;
	                term_in = {venue: name, limit: 10};
	                break;
	            default:
	                return;
	                break;
	        }

	        term.search(term_in, {
	            success: function(data) {

	                if (typeof data != 'undefined') {

	                    $('#autocomplete')
	                        .show()
	                        .children().detach();

	                    if (field.attr('id') == 'artistField') {
	                        res = data.results.artistmatches.artist;
	                    } else {
	                        res = data.results.venuematches.venue;
	                    }

	                    res.forEach(function(value, index) {
	                        $('#autocomplete').append('<div><a>' + value.name + '</a></div>');
	                    });

	                }
	 
	            }, error: function(code, message) {
	                if (code == 4)
	                    alert('error!');
	            } 
	        });

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

	$('#autocomplete').on('click', 'a', function() {
	    $("input[name='search-field']").val($(this).text());
	    $('#autocomplete').hide();
	    $('a[name="search-go"]').trigger('click');
	});


	/**
	 * If we have selected area - remove it
	 */

	$('#autocomplete').on('mouseenter', 'div', function() {
	    if ($('#autocomplete').has('.selectedTermin').toArray().length) {
	        $('.selectedTermin').removeClass('selectedTermin');
	    }
	});

	/**
	 * Switch search field/button options for different tabs
	 */

	$('.button-group button').on('click', function() {
	    $('.button-group button').each(function() {
	        $(this).attr('aria-selected', false); 
	    });

	    $(this).attr('aria-selected', true);

	    var $field = $("#search-box input");
	    var $link = $("#search-box a");

	    $field.val('').removeClass("invalid");

	    switch ($(this).attr('id')) {
	        case 'artistTab':
	            $field.attr({'id': 'artistField', 'placeholder': 'Enter artist name..'}).focus();
	            $link.attr('id', 'artistButton');
	            break;
	        case 'cityTab':
	            $field.attr({'id': 'cityField', 'placeholder': 'Enter country or city..'}).focus();
	            $link.attr('id', 'cityButton');
	            break;
	        case 'venueTab':
	            $field.attr({'id': 'venueField', 'placeholder': 'Enter venue..'}).focus();
	            $link.attr('id', 'venueButton');
	            break;
	        default:
	            break;
	    }
	});


	/**
	 * Scrolling event to show Go Top area when we're at the bottom
	 */

	$(window).on('scroll', function() {
	    if ($('html, body').scrollTop() > ($('#artist-info').height() - $('html, body').height())) {
	        $('#gotop_area').slideDown(500);
	    } else {
	        $('#gotop_area').slideUp(500);
	    }
	});

	/**
	 * Go Top
	 */

	$('#gotop').on('click', function() {
	    $('html, body').animate({
	        'scrollTop': 0
	        }, 500, 'swing');
	});



});