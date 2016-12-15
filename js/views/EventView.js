define(['text', 
		'text!templates/Event.tmpl', 
		'App',
		'marionette'
], function(text, eventTemplate, App, Marionette) {
	'use strict';

	return Marionette.ItemView.extend({

		tagName: 'div id="event-item"',

		template: _.template(eventTemplate),

		ui: {
			saveEvent : '.save-event'
		},

		events: {
			'click'     		  : 'selectEvent',
			'mouseenter' 		  : 'showPopup',
			'mouseleave'  		  : 'hidePopup',
			'click @ui.saveEvent' : 'saveEvent'
		},

		initialize: function() {
			this.addIcon();
			this.addMarker();
			this.addPopup();

			this.listenTo(this.model, 'change:filtered', this.filterEvent);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		filterEvent: function() {
			if (!this.model.get('filtered')) {
				this.$el.hide();
			} else {
				this.$el.show();
			}		
		},

		saveEvent: function(e) {
			e.stopPropagation();
			this.save();
		},

		save: function() {
			this.model.save({event_id: this.model.get('id')},
			{
				patch: true,
				error: function() {
					App.vent.trigger('showNotification', 'Error!');
				},
				success: function(model, response) {
					switch (response.result) {
						case 'success':
							App.vent.trigger('showNotification', 'The event is saved!');
							break;
						case 'fail':
							App.vent.trigger('showNotification', 'This event is already saved!');
							break;
						case 'guest':
							App.vent.trigger('showNotification', 'Sign in!');
							break;
					}			
				}	
			});
		},

		addIcon: function() {
			if (this.model.get('image')) {
				var icon = L.icon({
					iconUrl: this.model.get('image'),
					iconSize: this.model.collection.param == 'geo' ? [75, 75] : [25, 25],
					className: "dot"
				});

				this.model.set('icon', icon);
			}
		},

		addMarker: function() {
			if (this.model.get('venue').location['geo:point']['geo:lat'] && 
				this.model.get('venue').location['geo:point']['geo:long'] &&
				this.model.get('icon')) {

				this.model.set('marker', 
					L.marker([this.model.get('venue').location['geo:point']['geo:lat'], 
							  this.model.get('venue').location['geo:point']['geo:long']],
							{icon: this.model.get('icon')}));
					// .addTo(App.map.getMap()));

				App.map.getCluster().addLayer(this.model.get('marker'));
			}
		},

		addPopup: function() {

			if(this.model.get('marker') == null) {
				return false;
			}

			this.model.set("popup", 
				L.popup({
					autoPan: false,
					closeButton: false,
					offset: L.point(0, this.model.collection.param == 'geo' ? -30 : -5),
					closeOnClick: false,
					className: 'p'+this.model.get('id')
				})
				.setLatLng(this.model.get('marker').getLatLng())
				.setContent(this.template(this.model.toJSON())));

			var actions = {
				mouseover: this.showPopup,
				mouseout: this.hidePopup,
				click: this.selectEvent
			};

			this.model.get('marker').on(actions, this);

			var self = this;

			App.map.$el.on('click', '.p'+this.model.get('id')+' .save-event', function() {
				self.save();
			});

		},

		selectEvent: function() {
			if (this.model.get('popup') != null) {
				if(this.model.get('selected')) {
					this.hidePopup();
					this.model.set('selected', false);
					App.vent.trigger('hideEventDetails');
				} else {
					this.showPopup();
					this.model.set('selected', true);
					App.map.getMap().panTo(this.model.get('marker').getLatLng());
					App.vent.trigger('showEventDetails', this.model);
				}
			}
			return false;
		},

		showPopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				App.map.getMap().addLayer(this.model.get('popup'));
				this.$el.addClass('selected');
				return false;
			}
		},

		hidePopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				App.map.getMap().removeLayer(this.model.get('popup'));
				this.$el.removeClass('selected');
				return false;
			}
		}

	});

});