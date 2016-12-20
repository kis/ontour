'use strict';

import { Model } from 'backbone';

export default class Event extends Model {

	constructor(props) {
		super(props);

		this.defaults = {
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
		};

		this.url = '/events/:id';
	}

}