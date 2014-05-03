define(['channel',
		'text', 
		'text!templates/Controls.tmpl',
		'marionette'
], function(channel, text, controlsTmpl) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#controls-top',

		template: _.template(controlsTmpl),

		ui: {
			slide   : '#slide',
			paths   : '#paths',
			markers : '#markers'
		},

		events: {
			'click @ui.slide'   : 'slide',
			'click @ui.markers' : 'switchMarkers', 
			'click @ui.paths'   : 'switchPaths'
		},

		slide: function() {
			$('#sidebar').animate({
				left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
			});

			$('#slide b').text(parseInt($('#sidebar').css('left'),10) == 0 ? '>' : '<');

			if ($('#go-top').css('display') == 'block') {
				$('#go-top').css({display: 'none'});
			}
		},

		switchMarkers: function() {
			this.ui.markers.toggleClass('active');
			channel.trigger('switchMarkers');
		},

		switchPaths: function() {
			this.ui.paths.toggleClass('active');
			channel.trigger('switchPaths');
		}

	});

});