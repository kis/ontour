'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({

	defaults: {
		id: 'id',
		title: 'title',
		artists: 'artists',
		date: 'date',
		venue: 'venue',
		image: null,
		icon: null,
		marker: null,
		popup: null,
		path: null,
		url: null,
		selected: false,
		filtered: true
	},

	url: '/events/:id'

});