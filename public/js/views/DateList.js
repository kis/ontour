define(['views/DateView',
		'marionette'
], function(DateView, Marionette) {
	'use strict';

	return Marionette.CollectionView.extend({
		itemView: DateView
	});

});