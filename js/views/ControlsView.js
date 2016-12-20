'use strict';

import { View } from 'backbone.marionette';
import controlsTmpl from '../templates/Controls.tmpl';

export default class ControlsView extends View {

	constructor(props) {
		super(props);

		this.itemViewContainer = '#controls';

		this.template = controlsTmpl;

		this.ui = {
			gotop   : '#go-top',
			slide   : '#slide',
			layers	: '.layers',
			paths   : '#paths',
			markers : '#markers',
			picker	: '#date-selector',
			date	: '#date'
		};

		this.events = {
			'click @ui.slide'   : 'toggleSidebar',
			'click @ui.markers' : 'switchMarkers',
			'click @ui.paths'   : 'switchPaths',
			'click @ui.gotop'   : 'gotop',
			'click @ui.picker'  : 'toggleDatepicker'
		};
	}

	initialize() {
		this.on('gotop-show', this.gotopShow);
		this.on('gotop-hide', this.gotopHide);
		this.on('showControls', this.showControls);
		this.on('index-route', this.hideControls);

		this.on('setEventYear', this.setEventYear);
		this.on('setEventMonth', this.setEventMonth);
		this.on('setEventDay', this.setEventDay);

		this.listenTo(this.model, 'change:year change:month change:day', this.filter);
		this.listenTo(this.model, 'change:datepicker', this.showDatepicker);
	}

	toggleDatepicker() {
		this.model.set('datepicker', this.model.get('datepicker') ? false : true);
	}

	showDatepicker() {
		if (this.model.get('datepicker')) {
			this.ui.picker.addClass('active');
			this.ui.date.show();
		} else {
			this.ui.picker.removeClass('active');
			this.ui.date.hide();
		}
	}

	setEventYear(year) {
		this.model.set('year', year);
	}

	setEventMonth(month) {
		this.model.set('month', month);
	}

	setEventDay(day) {
		this.model.set('day', day);
	}

	showControls() {
		this.ui.layers.show();
		this.ui.picker.show();
	}

	hideControls() {
		this.ui.layers.hide();
		this.ui.picker.hide();
		this.ui.date.hide();
		this.ui.gotop.hide();
	}

	onShow() {
		this.ui.gotop.css({
			display: 'none'
		});
	}

	toggleSidebar() {
		$('#sidebar').css('left', (parseInt($('#sidebar').css('left'),10) == 0 ? -$('#sidebar').outerWidth() : 0));

		if (this.ui.gotop.css('display') == 'block') {
			this.ui.gotop.css({display: 'none'});
		}
	}

	filter() {
		this.triggerMethod('filter', {
			year  : this.model.get('year'),
			month : this.model.get('month'),
			day   : this.model.get('day')
		});
	}

	switchMarkers() {
		this.ui.markers.toggleClass('active');
		this.triggerMethod('switchMarkers');
	}

	switchPaths() {
		this.ui.paths.toggleClass('active');
		this.triggerMethod('switchPaths');
	}

	gotop() {
		this.triggerMethod('gotop');
	}

	gotopShow() {
		this.ui.gotop.css({
			display: 'inline-block'
		});
	}

	gotopHide() {
		this.ui.gotop.css({
			display: 'none'
		});
	}

}