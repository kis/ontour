'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import TagView from './TagView';

export default Marionette.CollectionView.extend({
	
	itemViewContainer: '#tags',

	itemView: TagView

});
