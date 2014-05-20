define(['map',
		'channel'
], function(map, channel) {
	'use strict';

	return Marionette.ItemView.extend({

		tagName: 'div class="tag"',

		template: _.template('<%= name %>'),

		ui: {
			saveEvent : '.save-event'
		},

		events: {
			'click' : 'selectEvent'
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

});