'use strict';

import { View } from 'backbone.marionette';
import eventDetailTpl from '../templates/EventDetail.tmpl';

export default class EventDetailsView extends View {

	constructor(props) {
		super(props);

		this.el = '#event-detail';

		this.template = eventDetailTpl;
	}

	initialize() {
		this.on('showEventDetails', this.showEventDetails);
		this.on('hideEventDetails', this.hideEventDetails);
	}

	showEventDetails(model) {
		this.$el.html(this.template(model.toJSON()));
		this.$el.show();
	}

	hideEventDetails() {
		this.$el.children().detach();
		this.$el.hide();
	}

}