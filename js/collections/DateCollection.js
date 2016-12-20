'use strict';

import { Collection } from 'backbone';
import Date from '../models/Date';

export default class DateCollection extends Collection {
	
	constructor(props) {
		super(props);

		this.model = Date;

		this.type = '';
	}
	
}
