define(['channel',
		'text', 
		'text!templates/Menu.tmpl',
		'marionette'
], function(channel, text, menuTemplate) {
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
			searchButton  : '.search-button'
		},

		events: {
			'click @ui.tabArtist'     : 'setActiveTabArtist',
			'click @ui.tabCity'		  : 'setActiveTabCity',
			'input @ui.searchField'	  : 'getAutocompleteData',
			'keydown @ui.searchField' : 'execAutocompleteProperty',
			'click @ui.searchButton'  : 'getEvents'
		},

		initialize: function() {
			this.listenTo(channel, 'fieldInvalid', this.fieldInvalid);
			this.listenTo(channel, 'search', this.search);
			this.listenTo(this.model, 'change:activeTab', this.updateMenu);
		},

		onShow: function() {
			this.ui.searchField.val('').focus();
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

		updateMenu: function() {
			this.ui.searchField.val('')
				   .removeClass('invalid')
				   .attr('placeholder', 'Enter ' + this.model.get('activeTab') + '..')
				   .focus();

			this.ui.tabs.removeClass('active');

			if (this.model.get('activeTab') == 'artist') {
				this.ui.tabArtist.addClass('active');
				this.ui.tags.slideUp(200);
			} else if (this.model.get('activeTab') == 'city') {
				this.ui.tabCity.addClass('active');
				this.ui.tags.slideDown(200);
			}
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
				this.ui.searchField.removeClass("invalid").focus();
				channel.trigger('getEvents', this.model.get('value'), this.model.get('param'));
			}
		}

	});

});