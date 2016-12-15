define(['backbone', 
		'models/Tag'
], function(Backbone, Tag) {
	'use strict';

	return Backbone.Collection.extend({
		model: Tag
	});
});