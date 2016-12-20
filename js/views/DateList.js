'use strict';

import { CollectionView } from 'backbone.marionette';
import DateView from './DateView';

export default class DateList extends CollectionView {
	itemView: DateView
}