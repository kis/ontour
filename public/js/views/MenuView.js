define(['collections/AutocompleteCollection',
		'views/AutocompleteList',
		'models/AutocompleteItem',
		'channel',
		'text', 
		'text!templates/Menu.tmpl',
		'marionette'
], function(AutocompleteCollection, AutocompleteList, AutocompleteItem, channel, text, menuTemplate) {
	'use strict';

	var autocompleteCollection,
		autocompleteList;

	return Marionette.ItemView.extend({

		// el: '#search', //body

		template: _.template(menuTemplate),

		onRender: function() {
			// Get rid of that pesky wrapping-div.
			// Assumes 1 child element present in template.
			// this.$el = this.$el.html();
			// Unwrap the element to prevent infinitely 
			// nesting elements during re-render.
			// this.$el.unwrap();
			// this.$el.unwrap();
			// this.setElement(this.$el);
		},

		ui: {
			tabs		  : '.tab',
			tabArtist     : '#artist',
			tabCity       : '#city',
			searchField   : '.search-field',
			searchButton  : '.search-button',
			autocomplete  : '#autocomplete',
			hoverlink	  : '.hover a',
			hover		  : '.hover',
			
			sidebar		  : '#sidebar',
			search		  : '#search',
			slide		  : '#slide',
			controlsTop	  : '#controls-top',
			goTop	  	  : '#go-top'
		},

		events: {
			'click @ui.tabArtist, @ui.tabCity' : 'setActiveTab',
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty',
			'click @ui.searchButton'		   : 'getEvents',

			'click @ui.hover'				   : 'search',

			'click @ui.slide'				   : 'slide',
			'click @ui.goTop'				   : 'gotop'
		},

		initialize: function() {
			autocompleteCollection = new AutocompleteCollection(),
			autocompleteList = new AutocompleteList({collection: autocompleteCollection});

			this.listenTo(this.model, 'change', this.updateMenu);

			$('body, html').on({
				'click'   : this.outsideHandler,
				'keydown' : this.outsideHandler
			});

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
			autocompleteList.repaint();

			if (this.model.get('activeTab') == 'artist') {

				$.ajax({
					url: 'http://ws.audioscrobbler.com/2.0/',
					type: 'GET',
					data: {
						method: 'artist.search',
						artist: this.ui.searchField.val(),
						limit: 5,
						api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
						format: 'json'
					},
					success: function(data) {
						if (typeof data.results != 'undefined') {
							var res = data.results.artistmatches.artist;

							if (typeof res != 'undefined' && res.length) {
								res.forEach(function(value, index) {
									autocompleteCollection.add(new AutocompleteItem({
										title: value.name, 
										meta: '', 
										selected: false
									}));
								});
							}
						}
					}
				});

			} else if (this.model.get('activeTab') == 'city') {

				var promise = $.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+this.ui.searchField.val());

				promise.done(function (data) {
					data.length = 5;

					data.forEach(function(value, index) {
						if (value && typeof value != 'undefined') {
							var res = value.split(', ');
							autocompleteCollection.add(new AutocompleteItem({
								title: res[0], 
								meta: res[2], 
								selected: false
							}));
						}
					});
				});

			}
		},

		execAutocompleteProperty: function(e) {
			switch (e.keyCode) {
				case 13:
					//enter - get termin to input and search
					this.search();
					break;
				case 27:
					//esc - hide autocomplete
					autocompleteList.close();
					break;
				case 38:
					//up
					autocompleteCollection.prev();
					break;
				case 40:
					//down
					autocompleteCollection.next();
					break;
				default:
					break;
			}
		},

		search: function() {
			this.bindUIElements();
			this.ui.searchField.val(this.ui.hoverlink.text());
			this.ui.searchButton.trigger('click');
			autocompleteList.close();
		},

		getSearchValue: function() {

			var field = $(".search-field");
			var search_val = field.val();

			if(!search_val) {
				field.addClass("invalid").focus();
				$('#artist-info').children().detach();
				return;
			}

			field.removeClass("invalid");
			$('#artist-info').children(':not(#go-top, .info-block)').detach();

			return search_val;
		},

		getEvents: function() {

			var search_val = this.getSearchValue;

			if (!search_val) {
				return false;
			}

			var param;

			if (this.model.get('activeTab') == 'artist') {
				param = 'artist';
			} else if (this.model.get('activeTab') == 'city') {
				param = 'geo';
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
						method: param + '.getevents',
						location: search_val,
						artist: search_val,
						autocorrect: 1,
						page: search.get('page'),
						limit: 10,
						api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
						format: 'json'
					},
					success: function(data) {
						getEventsData(data, eventCollection, param, search, searchView);

						search.set('page', search.get('page') + 1);

						if (search.get('page') <= search.get('totalPages')) {
							go();
						}
					}
				});
			}());
		},

		getEventsData: function(data, eventCollection, param, search, searchView) {

			if (data.error == 8 || data.events.total == 0) {
				search.set({totalPages: 0});
				return false;
			}

			search.set({totalPages: data.events["@attr"].totalPages,
						total: data.events["@attr"].total});

			searchView.render();

			var events = data.events.event;

			if (search.get('page') == search.get('totalPages') && /1$/.test(search.get('total'))) {
				createEventModel(events, events, null);
				return false;
			}

			events.forEach(function(value, index) {
				createEventModel(events, value, index);

				if (search.get('page') == 1 && index == 0) {
					mapView.getMap().setView(
						L.latLng(value.venue.location['geo:point']['geo:lat'], 
								 value.venue.location['geo:point']['geo:long']), 
						param == "artist" ? 4 : 12);
				}
			});

			function createEventModel(events, value, index) {
				eventCollection.add(new Event({
					id: value.id,
					title: value.title,
					artists: value.artists,
					date: value.startDate,
					venue: value.venue,
					image: value.image[2]['#text'],
					map: mapView.getMap(),
					param: param
				}));
			}

		},

		outsideHandler: function(e) {
			if (e.type == 'keydown') {
				if (e.keyCode == 27) {
					autocompleteList.close();
				}
			} else {
				autocompleteList.close();
			}
		},

		slide: function() {
			this.ui.sidebar.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? -this.ui.sidebar.outerWidth() : 0
			});

			this.ui.controlsTop.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? 0 : 360
			}).find('b').text(parseInt(this.ui.sidebar.css('left'),10) == 0 ? '>' : '<');

			if (this.ui.goTop.css('display') == 'block') {
				this.ui.goTop.css({display: 'none'});
			}
		},

		gotop: function() {
			channel.trigger('gotop');
		}

	});

});