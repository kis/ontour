'use strict';

import { Model } from 'backbone';

export default class AutocompleteItem extends Model {

	constructor(props) {
		super(props);
		
		this.defaults = {
			title: 'title',
			meta: '',
			selected: false
		};
	}

}
