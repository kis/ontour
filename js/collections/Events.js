'use strict';

import { Collection } from 'backbone';
import Event from '../models/Event';

export default class Events extends Collection {
	
	constructor(props) {
		super(props);

		this.model = Event;

		this.showMarkers = true;

		this.showPaths = true;

		this.param = '';

		this.url = '/events';
	}
	
}