define(['channel',
		'text', 
		'text!templates/Menu.tmpl',
		'marionette'
], function(channel, text, menuTemplate) {
	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(menuTemplate),

		ui: {
			tabs		  : '.tab',
			tabArtist     : '#artist',
			tabCity       : '#city',
			searchField   : '.search-field',
			searchButton  : '.search-button'
			
			/*sidebar		  : '#sidebar',
			slide		  : '#slide',
			controlsTop	  : '#controls-top'*/
		},

		events: {
			'click @ui.tabArtist, @ui.tabCity' : 'setActiveTab',
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty',
			'click @ui.searchButton'		   : 'getEvents'

			// 'click @ui.slide'				   : 'slide',
		},

		initialize: function() {
			this.listenTo(channel, 'search', this.search);

			this.listenTo(this.model, 'change', this.updateMenu);

			this.bindUIElements();

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

		/*getSearchValue: function() {

			var field = this.ui.searchField;
			var search_val = this.ui.searchField.val();

			if (!search_val) {
				field.addClass("invalid").focus();
				return;
			}

			field.removeClass("invalid");

			return search_val;
		},*/

		getEvents: function() {

			var search_val = this.ui.searchField.val();

			console.log(search_val);

			// return;

			/*if (!search_val) {
				return false;
			}*/

			var param;

			if (this.model.get('activeTab') == 'artist') {
				param = 'artist.getevents';
			} else if (this.model.get('activeTab') == 'city') {
				param = 'geo.getevents';
			}

			channel.trigger('getEvents', search_val, param);
		},

		/*slide: function() {
			this.ui.sidebar.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? -this.ui.sidebar.outerWidth() : 0
			});

			this.ui.controlsTop.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? 0 : 360
			}).find('b').text(parseInt(this.ui.sidebar.css('left'),10) == 0 ? '>' : '<');

			if (this.ui.goTop.css('display') == 'block') {
				this.ui.goTop.css({display: 'none'});
			}
		}*/

	});

});