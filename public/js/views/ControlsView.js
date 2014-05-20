define(['channel',
		'text', 
		'text!templates/Controls.tmpl',
		'marionette'
], function(channel, text, controlsTmpl) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#controls',

		template: _.template(controlsTmpl),

		ui: {
			gotop   	: '#go-top',
			slide   	: '#slide',
			layers		: '.layers',
			paths   	: '#paths',
			markers 	: '#markers',
			selects		: 'input',
			selectMonth : '#select-month',
			selectDay   : '#select-day'
		},

		events: {
			'click @ui.slide'   	  			    : 'slide',
			'click @ui.markers' 	  			    : 'switchMarkers',
			'click @ui.paths'   	  			    : 'switchPaths',
			'click @ui.gotop'   	  			    : 'gotop',
			'change @ui.selectMonth, @ui.selectDay' : 'filter'
		},

		initialize: function() {
			this.listenTo(channel, 'gotop-show', this.gotopShow);
			this.listenTo(channel, 'gotop-hide', this.gotopHide);
			this.listenTo(channel, 'showControls', this.showControls);
		},

		showControls: function() {
			this.ui.layers.show();
			this.ui.selects.show();
		},

		onShow: function() {
			this.ui.gotop.css({
				display: 'none'
			});
		},

		slide: function() {
			$('#sidebar').animate({
				left: parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0
			});

			this.ui.slide.find('b').text(parseInt($('#sidebar').css('left'),10) == 0 ? '>' : '<');

			if (this.ui.gotop.css('display') == 'block') {
				this.ui.gotop.css({display: 'none'});
			}
		},

		filter: function() {
			channel.trigger('filter', {
				month : this.ui.selectMonth.val(), 
				day   : this.ui.selectDay.val()
			});
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