'use strict';

import { View } from 'backbone.marionette';
import $ from 'jquery';
import AutocompleteItemView from './AutocompleteItemView';
import AutocompleteItem from '../models/AutocompleteItem';

export default class AutocompleteList extends View {

	itemViewContainer: '#autocomplete'

	itemView: AutocompleteItemView

	initialize() {
		$('body, html').on({
			'click'   : this.close.bind(this),
			'keydown' : this.outsideHandler.bind(this)
		});

		this.on('addArtistsData', this.addArtistsData);
		this.on('addCitiesData', this.addCitiesData);
		this.on('execProperty', this.execProperty);

		this.listenTo(this.collection, 'close', this.close);
		this.listenTo(this.collection, 'repaint', this.repaint);
	}

	repaint() {
		this.collection.reset();
		this.$el.hide().show();
	}

	close() {
		this.collection.reset();
		this.collection.currentElement = undefined;
		this.$el.hide();
	}

	addArtistsData(artist) {
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
	}

	addCitiesData(city) {
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
	}

	execProperty(key) {

		switch (key) {
			case 13:
				//enter - get termin to input and search
				if (typeof this.collection.getElement() != 'undefined') {
					this.triggerMethod('search', this.collection.getElement().get('title'));
				} else {
					this.triggerMethod('fieldInvalid');
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

	}

	outsideHandler(e) {
		if (e.type == 'keydown' && e.keyCode == 27) {
			this.close();
		}
	}

}