define(['underscore', 
		'backbone',
		'marionette', 
		'mapbox'
], function(_, Backbone, Marionette) {
	'use strict';

	return Backbone.Marionette.ItemView.extend({

		el: '#autocomplete',

		ui: {
			'autocomplete'    : '#autocomplete',
			'autocompleteDiv' : '#autocomplete div',
			'hover' 		  : '.hover'
		},

		events: {
			'input @ui.searchField'			   : 'getAutocompleteData',
			'keydown @ui.searchField'		   : 'execAutocompleteProperty',
			'mouseenter @ui.autocompleteDiv'   : 'setAutocompleteHover'
		},

		initialize: function() {
			this.model.on('change', this.updateMenu, this);
			
			this.bindUIElements();

			this.ui.searchField.val('').focus();
		},

		getAutocompleteData: function() {
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
							$('#autocomplete')
								.show()
								.children().detach();

							var res = data.results.artistmatches.artist;

							if (typeof res != 'undefined' && res.length) {
								res.forEach(function(value, index) {
									$('#autocomplete').append('<div><a>' + value.name + '</a></div>');
								});
							}
						}
					}
				});

			} else if (this.model.get('activeTab') == 'city') {

				$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+this.ui.searchField.val(), function (data) {
					$('#autocomplete')
						.show()
						.children().detach();

					data.length = 5;

					data.forEach(function(value, index) {
						if (value && typeof value != 'undefined') {
							var res = value.split(', ');
							$('#autocomplete').append('<div><a>' + res[0] + '</a> ' + res[2] + '</div>');
						}
					});
				});

			}
		},

		execAutocompleteProperty: function(e) {
			// var label;

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
		},

		setAutocompleteHover: function(e) {
			this.bindUIElements();
			this.ui.hover.removeClass('hover');
			$(e.target).addClass('hover');
		}

	});

});