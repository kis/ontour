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

			return;

			/*if (!search_val) {
				return false;
			}*/

			var param;

			if (this.model.get('activeTab') == 'artist') {
				param = 'artist.getevents';
			} else if (this.model.get('activeTab') == 'city') {
				param = 'geo.getevents';
			}

			/*var search = new SearchStatus({page: 1, total: 1, totalPages: 1}),
				searchView = new SearchStatusView({model: search}),
				eventCollection = new Events();*/
			
			// eventsListView = new EventsList({collection: eventCollection});

			(function go() {
				Backbone.ajax({
					url: 'http://ws.audioscrobbler.com/2.0/',
					type: 'GET',
					data: {
						method: param,
						location: search_val,
						artist: search_val,
						autocorrect: 1,
						page: search.get('page'),
						limit: 10,
						api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
						format: 'json'
					},
					success: function(data) {
						getEventsData(data, param, search, searchView);

						search.set('page', search.get('page') + 1);

						if (search.get('page') <= search.get('totalPages')) {
							go();
						}
					}
				});
			}());
		},

		getEventsData: function(data, param, search, searchView) {

			if (data.error == 8 || data.events.total == 0) {
				search.set({totalPages: 0});
				return false;
			}

			search.set({totalPages: data.events["@attr"].totalPages,
						total: data.events["@attr"].total});

			searchView.render();

			var events = data.events.event;

			if (search.get('page') == search.get('totalPages') && /1$/.test(search.get('total'))) {
				channel.trigger('addEvents', events, param);	
				return false;
			}

			events.forEach(function(value, index) {
				channel.trigger('addEvents', value, param);				

				if (search.get('page') == 1 && index == 0) {
					mapView.getMap().setView(
						L.latLng(value.venue.location['geo:point']['geo:lat'], 
								 value.venue.location['geo:point']['geo:long']), 
						param == "artist" ? 4 : 12);
				}
			});

		}

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