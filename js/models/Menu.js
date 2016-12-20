'use strict';

import { Model } from 'backbone';

export default class Menu extends Model {

	constructor(props) {
		super(props);

		this.defaults = {
			activeTab: 'artist',
			value: '',
			param: 'artist',
			activeTag: '',
			festivalsonly: 0
		};
	}
	
}