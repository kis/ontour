define(['underscore', 'backbone'], function(_, Backbone) {

	var SearchStatus = Backbone.Model.extend({

		defaults: {
			page: 1,
			total: 1,
			totalPages: 1,
			status: 1
		}

	});

	return SearchStatus;

});