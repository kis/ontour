'use strict';

import Backbone from 'backbone';
import Date from '../models/Date';

export default Backbone.Collection.extend({
	model: Date,

	type: ''
});
