'use strict';

import { View } from 'backbone.marionette';
import _ from 'underscore';

class AutocompleteItemView extends View {

	constructor(props) {
		super(props);

		this.tagName = 'div';

		this.template = _.template('<a><%= title %></a> <%= meta %>');

		this.ui = {
			item : 'a'
		};

		this.events = {
			'mouseenter' : 'select',
			'mouseleave' : 'deselect',
			'click'		 : 'search'
		};
	}

	render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

	initialize() {
		this.listenTo(this.model, 'change', this.hover);
	}

	select() {
		this.model.set('selected', true);
	}

	deselect() {
		this.model.set('selected', false);
	}

	hover() {
		if (this.model.get('selected')) {
			this.$el.addClass('hover');
		} else {
			this.$el.removeClass('hover');
		}
	}

	search() {
		this.bindUIElements();
		this.triggerMethod('search', this.ui.item.text());
	}

}

export default AutocompleteItemView;