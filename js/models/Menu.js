define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			activeTab: 'artist',
			value: '',
			param: 'artist',
			activeTag: '',
			festivalsonly: 0
		}
		
	});

});