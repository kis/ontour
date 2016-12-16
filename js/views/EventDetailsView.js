'use strict';

import Marionette from 'marionette';
import App from '../App';
import text from 'text';
import eventDetailTpl from 'text!templates/EventDetail.tmpl';

export default Marionette.ItemView.extend({

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