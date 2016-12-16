'use strict';

import Backbone from 'backbone';
import Tag from '../models/Tag';

export default Backbone.Collection.extend({
	model: Tag
});