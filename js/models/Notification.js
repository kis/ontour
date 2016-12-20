'use strict';

import { Model } from 'backbone';

export default class Notification extends Model {

	constructor(props) {
		super(props);

		this.defaults = {
			message: 'Notification',
		};
	}
	
}