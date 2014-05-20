define(['map',
		'channel'
], function(map, channel) {
	'use strict';

	return Marionette.ItemView.extend({

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
					this.model.set('active', this.model.get('active') ? false : true);
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

});