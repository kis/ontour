define(['text', 
		'text!templates/Notification.tmpl', 
		'map',
		'channel'
], function(text, notificationTpl, map, channel) {
	'use strict';

	return Marionette.ItemView.extend({

		itemViewContainer: '#notification',

		template: _.template(notificationTpl),

		ui: {
			ok : '.notification-ok'
		},

		events: {
			'click @ui.ok' : 'close'
		},

		initialize: function() {
			this.listenTo(channel, 'showNotification', this.setNotification);
		},

		setNotification: function(notification) {
			this.model.set({
				header : notification.header,
				body   : notification.body
			});

			this.$el.show(100);
			this.render();

			var self = this;

			setTimeout(function() {
				self.$el.hide(100);
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