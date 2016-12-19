'use strict';

import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import App from '../App';
import eventDetailTpl from '../templates/EventDetail.tmpl';

export default Marionette.View.extend({

	el: '#event-detail',

	template: eventDetailTpl,

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