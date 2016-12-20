'use strict';

import { Model } from 'backbone';

export default class Date extends Model {

	constructor(props) {
		super(props);
	
		this.defaults = {
			name   : 'day',
			active : false
		};
	}
	
}