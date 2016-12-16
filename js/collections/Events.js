'use strict';

import Backbone from 'backbone';
import Event from '../models/Event';

export default Backbone.Collection.extend({
	model: Event,

	showMarkers: true,

	showPaths: true,

	param: '',

	url: '/events'
});