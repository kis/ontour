define(['text', 
		'text!templates/Event.tmpl', 
		'map',
		'channel'
], function(text, eventTemplate, map, channel) {
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
			this.model.save({id: this.model.get('id')}, {patch: true});
			channel.trigger('showNotification', 'The event is saved!');
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
							{icon: this.model.get('icon')})
					.addTo(map.getMap()));
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

			map.$el.on('click', '.p'+this.model.get('id')+' .save-event', function() {
				self.save();
			});

		},

		selectEvent: function() {
			if (this.model.get('popup') != null) {
				if(this.model.get('selected')) {
					this.hidePopup();
					this.model.set('selected', false);
				} else {
					this.showPopup();
					this.model.set('selected', true);
					map.getMap().panTo(this.model.get('marker').getLatLng());
				}
			}
			return false;
		},

		showPopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				map.getMap().addLayer(this.model.get('popup'));
				this.$el.addClass('selected');
				return false;
			}
		},

		hidePopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				map.getMap().removeLayer(this.model.get('popup'));
				this.$el.removeClass('selected');
				return false;
			}
		}

	});

});