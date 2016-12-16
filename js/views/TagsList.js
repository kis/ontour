'use strict';

import Backbone from 'backbone';
import Marionette from '../../lib/backbone.marionette.min';
import TagView from './TagView';

export default Marionette.CollectionView.extend({
	
	itemViewContainer: '#tags',

	itemView: TagView

});
