
$(function() {
	
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
	 * Tab control
	 */

	$('#slide').on('click', function() {
		$('#sidebar').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
		});

		$('#search').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
		});

		$('#controls-top').animate({
			left: parseInt($('#sidebar').css('left'),10) == 0 ? 0 : 360
		}).find('b').text(parseInt($('#sidebar').css('left'),10) == 0 ? '>' : '<');

		if ($('#go-top').css('display') == 'block') {
			$('#go-top').css({
				display: 'none'
			});
		}
	});

	/**
	 * Scrolling event to show Go Top area when we're at the bottom
	 */

	$('#events').on('scroll', function() {
		if ($('#events').scrollTop() > $('#events').height()) {
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
		$('#events').animate({
			'scrollTop': 0
			}, 500, 'swing');
	});

});