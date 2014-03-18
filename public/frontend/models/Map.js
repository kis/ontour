
define(['underscore', 'backbone'], function(_, Backbone) {

	var Map = Backbone.Model.extend({
		
		defaults: {
			map: {}
		}

	});

	return Map;

});