'use strict';

import { Model } from 'backbone';

export default class Controls extends Model {

	constructor(props) {
		super(props);
		
		this.defaults = {
			year       : '',
			month      : '',
			day        : '',
			datepicker : false
		};
	}

}