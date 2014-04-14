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
			if (this.model.get('image')) {
				var icon = L.icon({
					iconUrl: this.model.get('image'),
					iconSize: this.model.get('param') == 'geo' ? [75, 75] : [25, 25],
					className: "dot"
				});

				this.model.set('icon', icon);
			}
		},

		addMarker: function() {
			if (this.model.get('venue').location['geo:point']['geo:lat'] && 
				this.model.get('venue').location['geo:point']['geo:long']) {

				var marker = L.marker([this.model.get('venue').location['geo:point']['geo:lat'], 
									   this.model.get('venue').location['geo:point']['geo:long']]).addTo(this.model.get('map'));

				this.model.set('marker', marker);

				if (this.model.get('icon')) {
					this.model.get('marker').setIcon(this.model.get('icon'));
				}
			}
		},

		addPopup: function() {

			if(this.model.get('marker') == null) {
				return false;
			}

			var latlng = this.model.get('marker').getLatLng();

			var popup = L.popup({
							autoPan: false,
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
					this.hidePopup();
					this.model.set('selected', false);
				} else {
					this.showPopup();
					this.model.set('selected', true);
					this.model.get('map').setView(L.latLng(this.model.get('venue').location['geo:point']['geo:lat'], 
									   				this.model.get('venue').location['geo:point']['geo:long']), 5);
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