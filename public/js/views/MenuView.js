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
			searchButton  : '.search-button'
		},

		events: {
			'click @ui.tabArtist, @ui.tabCity' : 'setActiveTab',
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty',
			'click @ui.searchButton'		   : 'getEvents'
		},

		initialize: function() {
			this.listenTo(channel, 'fieldInvalid', this.fieldInvalid);
			this.listenTo(channel, 'search', this.search);
			this.listenTo(this.model, 'change', this.updateMenu);
		},

		onShow: function() {
			this.ui.searchField.val('').focus();
		},

		setActiveTab: function(e) {
			this.model.set('activeTab', $(e.target).attr('id'));
		},

		updateMenu: function() {
			this.ui.searchField.val('')
				   .removeClass('invalid')
				   .attr('placeholder', 'Enter ' + this.model.get('activeTab') + '..')
				   .focus();

			this.ui.tabs.removeClass('active');

			if (this.model.get('activeTab') == 'artist') {
				this.ui.tabArtist.addClass('active');
			} else if (this.model.get('activeTab') == 'city') {
				this.ui.tabCity.addClass('active');
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

			var search_val = this.ui.searchField.val();

			if (!search_val) {
				this.fieldInvalid();
				return false;
			} else {
				this.ui.searchField.removeClass("invalid").focus();
			}

			var param;

			if (this.model.get('activeTab') == 'artist') {
				param = 'artist';
			} else if (this.model.get('activeTab') == 'city') {
				param = 'geo';
			}

			channel.trigger('getEvents', search_val, param);
		}

	});

});