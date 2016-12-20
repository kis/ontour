'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import App from '../App';
import menuTemplate from '../templates/Menu.tmpl';

export default Marionette.View.extend({

	itemViewContainer: '#search',

	template: menuTemplate,

	ui: {
		tabs		  : '.tab',
		tabArtist     : '#artist',
		tabCity       : '#city',
		searchField   : '.search-field',
		tags		  : '#tags',
		searchButton  : '.search-button',
		festivals     : '.festivals'
	},

	events: {
		'click @ui.tabArtist'     : 'setActiveTabArtist',
		'click @ui.tabCity'		  : 'setActiveTabCity',
		'input @ui.searchField'	  : 'getAutocompleteData',
		'keydown @ui.searchField' : 'execAutocompleteProperty',
		'click @ui.searchButton'  : 'getEvents',
		'click @ui.festivals'     : 'setFestivalsonly'
	},

	initialize: function() {
		this.on('fieldInvalid', this.fieldInvalid);
		this.on('search', this.search);
		this.on('setActiveTag', this.setActiveTag);
		this.on('index-route', this.off);
		this.listenTo(this.model, 'change:activeTab', this.updateMenu);
		this.listenTo(this.model, 'change:festivalsonly', this.updateF);
	},

	off: function() {
		this.model.set(this.model.defaults);
		this.resetInput();
	},

	onShow: function() {
		this.ui.searchField.val('').focus();
	},

	setActiveTag: function(tag) {
		this.model.set('activeTag', tag);
	},

	setFestivalsonly: function() {
		this.model.set('festivalsonly', this.model.get('festivalsonly') ? 0 : 1);
	},

	updateF: function() {
		if (this.model.get('festivalsonly')) {
			this.ui.festivals.addClass('active');
		} else {
			this.ui.festivals.removeClass('active');
		}
	},

	setActiveTabArtist: function() {
		this.model.set({
			'activeTab' : 'artist',
			'param'     : 'artist'
		});
	},

	setActiveTabCity: function() {
		this.model.set({
			'activeTab' : 'city',
			'param'     : 'geo'
		});
	},

	resetInput: function() {
		this.ui.searchField.val('')
			   .removeClass('invalid')
			   .attr('placeholder', 'Enter ' + this.model.get('activeTab') + '..')
			   .focus();
	},

	updateMenu: function() {
		this.resetInput();

		this.ui.tabs.removeClass('active');

		if (this.model.get('activeTab') == 'artist') {
			this.ui.tabArtist.addClass('active');
			this.ui.tags.slideUp(200);
		} else if (this.model.get('activeTab') == 'city') {
			this.ui.tabCity.addClass('active');
			this.ui.tags.slideDown(200);
		}

		var self = this;

		setTimeout(function() {
			this.triggerMethod('setHeight', self.$el.height());
		}, 200);
	},

	getAutocompleteData: function() {
		if (this.model.get('activeTab') == 'artist') {
			this.triggerMethod('addArtistsData', this.ui.searchField.val());
		} else if (this.model.get('activeTab') == 'city') {
			this.triggerMethod('addCitiesData', this.ui.searchField.val());
		}
	},

	execAutocompleteProperty: function(e) {
		this.triggerMethod('execProperty', e.keyCode);
	},

	search: function(item) {
		this.bindUIElements();
		this.ui.searchField.val(item);
		this.getEvents();
	},

	fieldInvalid: function() {
		this.ui.searchField.addClass("invalid").focus();
	},

	getEvents: function() {
		this.model.set('value', this.ui.searchField.val());

		if (!this.model.get('value')) {
			this.fieldInvalid();
		} else {
			App.appRouter.navigate("search/" + this.model.get('value'));

			this.ui.searchField.removeClass("invalid").focus();
			this.triggerMethod('getEvents', {
				value : this.model.get('value'), 
				param : this.model.get('param'),
				tag   : this.model.get('activeTag'),
				fest  : this.model.get('festivalsonly')
			});
		}
	}

});