define(['underscore', 
		'backbone',
		'frontend/models/AutocompleteItem'
], function(_, Backbone, AutocompleteItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: AutocompleteItem
	});
});