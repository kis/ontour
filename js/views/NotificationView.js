'use strict';

import { View } from 'backbone.marionette';
import _ from 'underscore';

export default class NotificationView extends View {

	constructor(props) {
		super(props);
		
		this.itemViewContainer = '#notification';

		this.template = _.template('<%= message %>');

		this.events = {
			'click' : 'close'
		};
	}

	initialize() {
		this.on('showNotification', this.show);
	}

	show(notification) {
		this.model.set({message: notification});

		this.$el.show(100);
		this.render();

		var self = this;

		setTimeout(function() {
			self.close();
		}, 1500);			
	}

	render() {
		this.$el.html(this.template(this.model.toJSON()));
	}

	close() {
		this.$el.hide(100);
	}

}