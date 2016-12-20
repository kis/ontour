'use strict';

import { Model } from 'backbone';

export default class Map extends Model {
	
	constructor(props) {
		super(props);
		
		this.defaults = {
			map: {},
			cluster: {}
		};
	}

}