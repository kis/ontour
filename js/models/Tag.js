'use strict';

import { Model } from 'backbone';

export default class Tag extends Model {

	constructor(props) {
		super(props);

		this.defaults = {
			name   : 'pop',
			active : false
		};
	}
	
}