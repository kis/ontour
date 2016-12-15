define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			year       : '',
			month      : '',
			day        : '',
			datepicker : false
		}

	});

});