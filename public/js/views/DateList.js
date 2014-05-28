define(['views/DateView',
		'models/Date',
		'channel',
		'marionette'
], function(DateView, Date, channel) {
	'use strict';

	return Marionette.CollectionView.extend({
		itemView: DateView
	});

});