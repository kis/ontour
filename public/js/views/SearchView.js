define(['marionette',
		'channel',
		'map'
], function(Marionette, channel, map) {
	'use strict';

	return Marionette.ItemView.extend({
		
		el: '#status',

		tplNotFound: _.template('Not found'),
		tplLoad: _.template('<%= page * 10 %> / <%= total %>'),
		tplFinish: _.template('<%= total %> / <%= total %>'),

		initialize: function() {
			channel.trigger('reset');
			this.listenTo(channel, 'getEvents', this.getEvents);
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.show();

			if (this.model.get('page') < this.model.get('totalPages')) {
				this.$el.html(this.tplLoad(this.model.toJSON()));
			} else {
				this.$el.html(this.tplFinish(this.model.toJSON()));
			}

			if (!this.model.get('totalPages')) {
				this.$el.html(this.tplNotFound());
			}
		},

		getEvents: function(search_val, param) {

			channel.trigger('reset');
			this.model.set(this.model.defaults);

			var self = this;

			(function go() {
				Backbone.ajax({
					url: 'http://ws.audioscrobbler.com/2.0/',
					type: 'GET',
					data: {
						method: param + '.getevents',
						location: search_val,
						artist: search_val,
						autocorrect: 1,
						page: self.model.get('page'),
						limit: 10,
						api_key: 'dd349d2176d3b97b8162bb0c0e583b1c',
						format: 'json'
					},
					success: function(data) {
						self.getEventsData(data, param);

						self.model.set('page', self.model.get('page') + 1);

						if (self.model.get('page') <= self.model.get('totalPages')) {
							go();
						} else {
							channel.trigger('addPaths');
						}
					}
				});
			}());
		},

		getEventsData: function(data, param) {

			var self = this;

			if (data.error == 8 || data.events.total == 0) {
				this.model.set({totalPages: 0});
				return false;
			}

			this.model.set({totalPages: data.events["@attr"].totalPages,
						    total: data.events["@attr"].total});

			var events = data.events.event;

			if (this.model.get('page') == this.model.get('totalPages') && /1$/.test(this.model.get('total'))) {
				channel.trigger('addEvents', events, param);	
				return false;
			}

			events.forEach(function(value, index) {
				channel.trigger('addEvents', value, param);				

				if (self.model.get('page') == 1 && index == 0) {
					var latlon = L.latLng(value.venue.location['geo:point']['geo:lat'], 
										 value.venue.location['geo:point']['geo:long']);
					var zoom = (param == "artist") ? 4 : 12;

					channel.trigger('setView', latlon, zoom);
				}
			});

		}

	});

});