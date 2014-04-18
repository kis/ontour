define(['underscore',
		'backbone',
		'marionette'
], function(_, Backbone) {
	'use strict';

	return Backbone.Marionette.ItemView.extend({

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
			this.model.on('change', this.updateMenu, this);
			
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
		}

	});

});