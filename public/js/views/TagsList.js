define(['views/TagView',
		'marionette'
], function(TagView, Marionette) {
	'use strict';

	return Marionette.CollectionView.extend({
		
		itemViewContainer: '#tags',

		itemView: TagView

	});

});