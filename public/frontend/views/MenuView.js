define(['frontend/collections/AutocompleteCollection',
		'frontend/views/AutocompleteList',
		'frontend/models/AutocompleteItem',
		'marionette'
], function(AutocompleteCollection, AutocompleteList, AutocompleteItem) {
	'use strict';

	var autocompleteCollection,
		autocompleteList;

	return Marionette.ItemView.extend({

		el: '#search',

		ui: {
			'tabs'		      : '.tab',
			'tabArtist'       : '#artist',
			'tabCity'         : '#city',
			'searchField'     : '.search-field',
			'searchButton'    : '.search-button'
		},

		events: {
			'click @ui.tabArtist, @ui.tabCity' : 'setActiveTab',
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty'
		},

		initialize: function() {
			autocompleteCollection = new AutocompleteCollection(),
			autocompleteList = new AutocompleteList({collection: autocompleteCollection});

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
			autocompleteCollection.reset();

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
										selected: false})
									);
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
								selected: false})
							);
						}
					});
				});

			}
		},

		execAutocompleteProperty: function(e) {
			switch (e.keyCode) {
				case 13:
					//enter - get termin to input and search

					if (this.ui.hover.size()) {
						this.ui.searchField.val($('.hover a').text()); 
						this.ui.searchButton.trigger('click');
					} 

					this.ui.autocomplete.hide();

					break;
				case 27:
					//esc - hide autocomplete
					this.ui.autocomplete.hide();
					break;
				case 38:
					//up

					console.log(this.ui.hover.size());

					if (this.ui.hover.size()) {
						if (this.ui.hover.index() > 0) {
							this.ui.hover.removeClass('hover')
								   .prev().addClass('hover');
						} else {
							this.ui.hover.removeClass('hover');
							$('#autocomplete div:last').addClass('hover');
						}	
					} else {
						$('#autocomplete div:last').addClass('hover');
					}

					break;
				case 40:
					//down

					if (this.ui.hover.size()) {
						$('.hover').removeClass('hover')
								   .next().addClass('hover');
					} else {

					}

					break;
				default:
					break;
			}
		}

	});

});