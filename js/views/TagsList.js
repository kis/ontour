'use strict';

import { CollectionView } from 'backbone.marionette';
import TagView from './TagView';

export default class TagsList extends CollectionView {
	
	constructor(props) {
		super(props);
		
		this.itemViewContainer = '#tags';

		this.itemView = TagView;
	}

}
