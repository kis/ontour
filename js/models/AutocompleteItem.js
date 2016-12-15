define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			title: 'title',
			meta: '',
			selected: false
		}

	});

});