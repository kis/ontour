'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import App from '../App';

export default Marionette.View.extend({

	tagName: 'div class="tag"',

	template: _.template('<%= name %>'),

	events: {
		'click' : 'select'
	},

	initialize: function() {
		this.listenTo(this.model, 'change:active', this.activate);
	},

	select: function() {
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
	},

	activate: function() {
		if (this.model.get('active')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
		}
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});