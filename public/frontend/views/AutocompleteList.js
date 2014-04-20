define(['frontend/views/AutocompleteItemView',
		'channel',
		'marionette'
], function(AutocompleteItemView, channel) {
	'use strict';

	return Marionette.CollectionView.extend({

		el: '#autocomplete',

		itemView: AutocompleteItemView,

		initialize: function() {
			this.listenTo(this.collection, 'reset', this.reset);
		},

		reset: function() {
			this.$el.show();
		}

	});

});