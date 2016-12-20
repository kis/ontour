'use strict';

import { View } from 'backbone.marionette';
import _ from 'underscore';

export default class TagView extends View {

	constructor(props) {
		super(props);

		this.tagName = 'div class="tag"';

		this.template = _.template('<%= name %>');

		this.events = {
			'click' : 'select'
		};
	}

	initialize() {
		this.listenTo(this.model, 'change:active', this.activate);
	}

	select() {
		this.model.collection.models.forEach(function(model) {
			if (model == this.model) {
				if (this.model.get('active')) {
					this.model.set('active', false);
					this.triggerMethod('setActiveTag', '');
				} else {
					this.model.set('active', true);
					this.triggerMethod('setActiveTag', this.model.get('name'));
				}
			} else {
				model.set('active', false);
			}
		}, this);
	}

	activate() {
		if (this.model.get('active')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
		}
	}

	render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

}