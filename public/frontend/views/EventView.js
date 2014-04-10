define(['text', 
		'underscore', 
		'backbone', 
		'text!frontend/templates/Event.html', 
		'mapbox', 
		'marionette'
], function(text, _, Backbone, eventTemplate, mapbox) {
	'use strict';

	return Marionette.ItemView.extend({ //Backbone.View.extend({

		tagName: 'div id="event-item"',

		template: _.template(eventTemplate),

		initialize: function() {
			this.addIcon();
			this.addMarker();
			this.addPopup();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		events: {
			'click'     : 'selectEvent',
			'mouseover' : 'showPopup',
			'mouseout'  : 'hidePopup'
		},

		addIcon: function() {
			if (this.model.get('image') && this.model.get('param') == 'geo') {
				var icon = L.icon({
					iconUrl: this.model.get('image'),
					iconSize: [75, 75]
					// iconAnchor: [22, 94],
					// popupAnchor: [-3, -76]
				});

				this.model.set('icon', icon);
			}
		},

		addMarker: function() {
			if (this.model.get('venue').location['geo:point']['geo:lat'] && 
				this.model.get('venue').location['geo:point']['geo:long']) {

				var marker = L.marker([this.model.get('venue').location['geo:point']['geo:lat'], 
									   this.model.get('venue').location['geo:point']['geo:long']], {
							 	icon: L.mapbox.marker.icon({
							      "marker-color": "#10315a",
							      // "marker-symbol": "music",
							      "marker-size": "medium"
							    })
							 }).addTo(this.model.get('map'));

				this.model.set('marker', marker);

				if (this.model.get('icon')) {
					this.model.get('marker').setIcon(this.model.get('icon'));
					this.model.get('marker').riseOnHover = true;
					this.model.get('marker').size = 25;
					this.model.get('marker').riseOffset = 25;
				}
			}
		},

		addPopup: function() {

			if(this.model.get('marker') == null) {
				return false;
			}

			var latlng = this.model.get('marker').getLatLng();

			var popup = L.popup({
							closeButton: false,
							offset: L.point(0, -30),
							closeOnClick: false
						})
						.setLatLng(latlng)
						.setContent(this.template(this.model.toJSON()));

			this.model.set("popup", popup);

			var actions = {
				mouseover: this.showPopup,
				mouseout: this.hidePopup,
				click: this.selectEvent
			};

			this.model.get('marker').on(actions, this);
		},

		selectEvent: function() {
			if (this.model.get('popup') != null) {
				if(this.model.get('selected')) {
					this.model.get('map').closePopup(this.model.get('popup'));
					this.model.set('selected', false);
					$(this.el).removeClass('selected');
				} else {
					this.model.get('map').openPopup(this.model.get('popup'));
					this.model.set('selected', true);
					$(this.el).addClass('selected');
				}
			}
			return false;
		},

		showPopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				this.model.get('map').openPopup(this.model.get('popup'));
				$(this.el).addClass('selected');
				return false;
			}
		},

		hidePopup: function() {
			if (this.model.get('popup') != null && this.model.get('selected') == false) {
				this.model.get('map').closePopup(this.model.get('popup'));
				$(this.el).removeClass('selected');
				return false;
			}
		}

	});

});