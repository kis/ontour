define(['channel',
		'text', 
		'text!templates/Controls.tmpl',
		'marionette'
], function(channel, text, controlsTmpl) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#controls',

		template: _.template(controlsTmpl),

		initialize: function() {
			this.listenTo(channel, 'gotop-show', this.gotopShow);
			this.listenTo(channel, 'gotop-hide', this.gotopHide);
		},

		onShow: function() {
			this.ui.gotop.css({
				display: 'none'
			});
		},

		ui: {
			slide   : '#slide',
			paths   : '#paths',
			markers : '#markers',
			gotop   : '#go-top'
		},

		events: {
			'click @ui.slide'   : 'slide',
			'click @ui.markers' : 'switchMarkers',
			'click @ui.paths'   : 'switchPaths',
			'click @ui.gotop'   : 'gotop'
		},

		slide: function() {
			$('#sidebar').animate({
				left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
			});

			$('#slide b').text(parseInt($('#sidebar').css('left'),10) == 0 ? '>' : '<');

			if (this.ui.gotop.css('display') == 'block') {
				this.ui.gotop.css({display: 'none'});
			}
		},

		switchMarkers: function() {
			this.ui.markers.toggleClass('active');
			channel.trigger('switchMarkers');
		},

		switchPaths: function() {
			this.ui.paths.toggleClass('active');
			channel.trigger('switchPaths');
		},

		gotop: function() {
			channel.trigger('gotop');
		},

		gotopShow: function() {
			this.ui.gotop.css({
				display: 'inline-block'
			});
		},

		gotopHide: function() {
			this.ui.gotop.css({
				display: 'none'
			});
		}

	});

});