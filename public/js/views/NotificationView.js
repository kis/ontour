define(['App',
		'marionette'
], function(App, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#notification',

		template: _.template('<%= message %>'),

		events: {
			'click' : 'close'
		},

		initialize: function() {
			this.listenTo(App.vent, 'showNotification', this.show);
		},

		show: function(notification) {
			this.model.set({message: notification});

			this.$el.show(100);
			this.render();

			var self = this;

			setTimeout(function() {
				self.close();
			}, 1500);			
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		},

		close: function() {
			this.$el.hide(100);
		}

	});

});