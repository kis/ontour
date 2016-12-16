'use strict';

import Backbone from 'backbone';
import Marionette from '../../lib/backbone.marionette.min';
import DateView from './DateView';

export default Marionette.CollectionView.extend({
	itemView: DateView
});