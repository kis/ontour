'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({

	defaults: {
		year       : '',
		month      : '',
		day        : '',
		datepicker : false
	}

});