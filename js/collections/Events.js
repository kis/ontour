define(['backbone', 
		'models/Event'
], function(Backbone, Event) {
	'use strict';

	return Backbone.Collection.extend({
		model: Event,

		showMarkers: true,

		showPaths: true,

		param: '',

		url: '/events'
		
	});
});