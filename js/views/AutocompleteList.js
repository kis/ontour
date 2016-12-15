define(['views/AutocompleteItemView',
		'models/AutocompleteItem',
		'App',
		'marionette'
], function(AutocompleteItemView, AutocompleteItem, App, Marionette) {
	'use strict';

	return Marionette.CollectionView.extend({

		itemViewContainer: '#autocomplete',

		itemView: AutocompleteItemView,

		initialize: function() {
			$('body, html').on({
				'click'   : this.close.bind(this),
				'keydown' : this.outsideHandler.bind(this)
			});

			this.listenTo(App.vent, 'addArtistsData', this.addArtistsData);
			this.listenTo(App.vent, 'addCitiesData', this.addCitiesData);
			this.listenTo(App.vent, 'execProperty', this.execProperty);

			this.listenTo(this.collection, 'close', this.close);
			this.listenTo(this.collection, 'repaint', this.repaint);
		},

		repaint: function() {
			this.collection.reset();
			this.$el.hide().show();
		},

		close: function() {
			this.collection.reset();
			this.collection.currentElement = undefined;
			this.$el.hide();
		},

		addArtistsData: function(artist) {
			this.repaint();

			var self = this;

			$.ajax({
				url: 'http://ws.audioscrobbler.com/2.0/',
				type: 'GET',
				data: {
					method: 'artist.search',
					artist: artist,
					limit: 5,
					api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
					format: 'json'
				},
				success: function(data) {
					if (typeof data.results != 'undefined') {
						var res = data.results.artistmatches.artist;

						if (typeof res != 'undefined' && res.length) {
							res.forEach(function(value, index) {
								self.collection.add(new AutocompleteItem({
									title: value.name, 
									meta: '', 
									selected: false
								}));
							});
						}
					}
				}
			});
		},

		addCitiesData: function(city) {
			this.repaint();

			var self = this;

			$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+city).done(function (data) {
				data.length = 5;

				data.forEach(function(value, index) {
					if (value && typeof value != 'undefined') {
						var res = value.split(', ');
						self.collection.add(new AutocompleteItem({
							title: res[0], 
							meta: res[2], 
							selected: false
						}));
					}
				});
			});
		},

		execProperty: function(key) {

			switch (key) {
				case 13:
					//enter - get termin to input and search
					if (typeof this.collection.getElement() != 'undefined') {
						App.vent.trigger('search', this.collection.getElement().get('title'));
					} else {
						App.vent.trigger('fieldInvalid');
					}

					this.close();
					break;
				case 27:
					//esc - hide
					this.close();
					break;
				case 38:
					//up
					this.collection.prev();
					break;
				case 40:
					//down
					this.collection.next();
					break;
				default:
					break;
			}

		},

		outsideHandler: function(e) {
			if (e.type == 'keydown' && e.keyCode == 27) {
				this.close();
			}
		}

	});

});