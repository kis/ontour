define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			activeTab: 'artist',
			value: '',
			param: 'artist'
		}

		/*validate: function() {
			if (value == '') {
				return -1;
			}
		}*/

	});

});