define(['views/AutocompleteItemView',
		'channel',
		'marionette'
], function(AutocompleteItemView, channel) {
	'use strict';

	return Marionette.CollectionView.extend({

		el: '#autocomplete',

		itemView: AutocompleteItemView,

		initialize: function() {
			this.listenTo(channel, 'autocompleteClose', this.close);
			this.listenTo(this.collection, 'close', this.close);
			this.listenTo(this.collection, 'repaint', this.repaint);
		},

		repaint: function() {
			this.collection.reset();
			this.$el.show();
		},

		close: function() {
			this.collection.reset();
			this.$el.hide();
		}

	});

});