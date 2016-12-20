'use strict';

import { Model } from 'backbone';

export default class Search extends Model {

	constructor(props) {
		super(props);

		this.defaults = {
			page: 1,
			total: 1,
			totalPages: 1
		};
	}

}