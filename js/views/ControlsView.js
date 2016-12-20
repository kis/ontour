'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import App from '../App';
import controlsTmpl from '../templates/Controls.tmpl';

export default Marionette.View.extend({

	itemViewContainer: '#controls',

	template: controlsTmpl,

	ui: {
		gotop   : '#go-top',
		slide   : '#slide',
		layers	: '.layers',
		paths   : '#paths',
		markers : '#markers',
		picker	: '#date-selector',
		date	: '#date'
	},

	events: {
		'click @ui.slide'   : 'toggleSidebar',
		'click @ui.markers' : 'switchMarkers',
		'click @ui.paths'   : 'switchPaths',
		'click @ui.gotop'   : 'gotop',
		'click @ui.picker'  : 'toggleDatepicker'
	},

	initialize: function() {
		this.on('gotop-show', this.gotopShow);
		this.on('gotop-hide', this.gotopHide);
		this.on('showControls', this.showControls);
		this.on('index-route', this.hideControls);

		this.on('setEventYear', this.setEventYear);
		this.on('setEventMonth', this.setEventMonth);
		this.on('setEventDay', this.setEventDay);

		this.listenTo(this.model, 'change:year change:month change:day', this.filter);
		this.listenTo(this.model, 'change:datepicker', this.showDatepicker);
	},

	toggleDatepicker: function() {
		this.model.set('datepicker', this.model.get('datepicker') ? false : true);
	},

	showDatepicker: function() {
		if (this.model.get('datepicker')) {
			this.ui.picker.addClass('active');
			this.ui.date.show();
		} else {
			this.ui.picker.removeClass('active');
			this.ui.date.hide();
		}
	},

	setEventYear: function(year) {
		this.model.set('year', year);
	},

	setEventMonth: function(month) {
		this.model.set('month', month);
	},

	setEventDay: function(day) {
		this.model.set('day', day);
	},

	showControls: function() {
		this.ui.layers.show();
		this.ui.picker.show();
	},

	hideControls: function() {
		this.ui.layers.hide();
		this.ui.picker.hide();
		this.ui.date.hide();
		this.ui.gotop.hide();
	},

	onShow: function() {
		this.ui.gotop.css({
			display: 'none'
		});
	},

	toggleSidebar: function() {
		$('#sidebar').css('left', (parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0));

		if (this.ui.gotop.css('display') == 'block') {
			this.ui.gotop.css({display: 'none'});
		}
	},

	filter: function() {
		this.triggerMethod('filter', {
			year  : this.model.get('year'),
			month : this.model.get('month'),
			day   : this.model.get('day')
		});
	},

	switchMarkers: function() {
		this.ui.markers.toggleClass('active');
		this.triggerMethod('switchMarkers');
	},

	switchPaths: function() {
		this.ui.paths.toggleClass('active');
		this.triggerMethod('switchPaths');
	},

	gotop: function() {
		this.triggerMethod('gotop');
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