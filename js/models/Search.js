'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({

	defaults: {
		page: 1,
		total: 1,
		totalPages: 1
	}

});