define(['frontend/collections/AutocompleteCollection',
		'frontend/views/AutocompleteList',
		'frontend/models/AutocompleteItem',
		'marionette'
], function(AutocompleteCollection, AutocompleteList, AutocompleteItem) {
	'use strict';

	var autocompleteCollection,
		autocompleteList;

	return Marionette.ItemView.extend({

		el: 'body', //#search

		ui: {
			'tabs'		      : '.tab',
			'tabArtist'       : '#artist',
			'tabCity'         : '#city',
			'searchField'     : '.search-field',
			'searchButton'    : '.search-button',
			'autocomplete'    : '#autocomplete',
			'hoverlink'		  : '.hover a',
			'hover'			  : '.hover',
			
			'sidebar'		  : '#sidebar',
			'search'		  : '#search',
			'slide'			  : '#slide',
			'controlsTop'	  : '#controls-top',
			'goTop'	  		  : '#go-top',
			'events'		  : '#events'
		},

		events: {
			'click @ui.tabArtist, @ui.tabCity' : 'setActiveTab',
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty',
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

				$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+this.ui.searchField.val(), function (data) {
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

			this.ui.search.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? -this.ui.sidebar.outerWidth() : 0
			});

			this.ui.controlsTop.animate({
				left: parseInt(this.ui.sidebar.css('left'),10) == 0 ? 0 : 360
			}).find('b').text(parseInt(this.ui.sidebar.css('left'),10) == 0 ? '>' : '<');

			if (this.ui.goTop.css('display') == 'block') {
				this.ui.goTop.css({
					display: 'none'
				});
			}
		},

		gotop: function() {
			this.ui.events.animate({
				'scrollTop': 0
				}, 500, 'swing');
		}

	});

});