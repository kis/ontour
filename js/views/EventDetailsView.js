define(['text', 
		'text!templates/EventDetail.tmpl', 
		'App',
		'marionette'
], function(text, eventDetailTpl, App, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		el: '#event-detail',

		template: _.template(eventDetailTpl),

		initialize: function() {
			this.listenTo(App.vent, 'showEventDetails', this.showEventDetails);
			this.listenTo(App.vent, 'hideEventDetails', this.hideEventDetails);
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