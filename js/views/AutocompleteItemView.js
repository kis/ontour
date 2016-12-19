'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import App from '../App';

export default Marionette.View.extend({

	tagName: 'div',

	template: _.template('<a><%= title %></a> <%= meta %>'),

	ui: {
		item : 'a'
	},

	events: {
		'mouseenter' : 'select',
		'mouseleave' : 'deselect',
		'click'		 : 'search'
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.hover);
	},

	select: function() {
		this.model.set('selected', true);
	},

	deselect: function() {
		this.model.set('selected', false);
	},

	hover: function() {
		if (this.model.get('selected')) {
			this.$el.addClass('hover');
		} else {
			this.$el.removeClass('hover');
		}
	},

	search: function() {
		this.bindUIElements();
		App.vent.trigger('search', this.ui.item.text());
	}

});