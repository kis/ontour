define(['channel',
		'text', 
		'text!templates/Menu.tmpl',
		'router',
		'marionette'
], function(channel, text, menuTemplate, Router) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#search',

		template: _.template(menuTemplate),

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
			this.listenTo(channel, 'fieldInvalid', this.fieldInvalid);
			this.listenTo(channel, 'search', this.search);
			this.listenTo(channel, 'setActiveTag', this.setActiveTag);
			this.listenTo(channel, 'index-route', this.off);
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
				channel.trigger('setHeight', self.$el.height());
			}, 200);
		},

		getAutocompleteData: function() {
			if (this.model.get('activeTab') == 'artist') {
				channel.trigger('addArtistsData', this.ui.searchField.val());
			} else if (this.model.get('activeTab') == 'city') {
				channel.trigger('addCitiesData', this.ui.searchField.val());
			}
		},

		execAutocompleteProperty: function(e) {
			channel.trigger('execProperty', e.keyCode);
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
				Router.navigate("search/" + this.model.get('value'));

				this.ui.searchField.removeClass("invalid").focus();
				channel.trigger('getEvents', {
					value : this.model.get('value'), 
					param : this.model.get('param'),
					tag   : this.model.get('activeTag'),
					fest  : this.model.get('festivalsonly')
				});
			}
		}

	});

});