'use strict';

import { Collection } from 'backbone';
import Tag from '../models/Tag';

export default class Tags extends Collection {
	
	constructor(props) {
		super(props);

		this.model = Tag;
	}
	
}