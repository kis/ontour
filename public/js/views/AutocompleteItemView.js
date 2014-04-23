define(['channel',
		'marionette'
], function(channel) {
	'use strict';

	return Marionette.ItemView.extend({

		tagName: 'div',

		template: _.template('<a><%= title %></a> <%= meta %>'),

		events: {
			'mouseenter' : 'selectItem',
			'mouseleave' : 'deselectItem'
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.hover);
		},

		selectItem: function() {
			this.model.set('selected', true);
		},

		deselectItem: function() {
			this.model.set('selected', false);
		},

		hover: function() {
			if (this.model.get('selected')) {
				this.$el.addClass('hover');
			} else {
				this.$el.removeClass('hover');
			}
		}

	});

});