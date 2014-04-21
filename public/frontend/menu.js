
$(function() {
	
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