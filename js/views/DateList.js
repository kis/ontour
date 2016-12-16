'use strict';

import Backbone from 'backbone';
import Marionette from 'marionette';
import DateView from './DateView';

export default Marionette.CollectionView.extend({
	itemView: DateView
});