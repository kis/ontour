define(['views/TagView',
		'models/Tag',
		'channel',
		'marionette'
], function(TagView, Tag, channel, Marionette) {
	'use strict';

	return Marionette.CollectionView.extend({

		itemViewContainer: '#tags',

		itemView: TagView

	});

});