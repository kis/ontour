define(['text', 
		'text!templates/EventDetail.tmpl', 
		'map',
		'channel',
		'marionette'
], function(text, eventDetailTpl, map, channel, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		el: '#event-detail',

		template: _.template(eventDetailTpl),

		initialize: function() {
			this.listenTo(channel, 'showEventDetails', this.showEventDetails);
			this.listenTo(channel, 'hideEventDetails', this.hideEventDetails);
		},

		showEventDetails: function(model) {
			this.$el.html(this.template(model.toJSON()));
			this.$el.show();
		},

		hideEventDetails: function() {
			this.$el.children().detach();
			this.$el.hide();
		}

	});

});