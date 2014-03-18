
define(['text', 'underscore', 'backbone', 'text!frontend/templates/event.html'], function(text, _, Backbone, eventTemplate) {

	var EventView = Backbone.View.extend({

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
			'mouseover' : 'showPopup',
			'mouseout' : 'hidePopup'
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
									   this.model.get('venue').location['geo:point']['geo:long']]).addTo(this.model.get('map'));
				this.model.set('marker', marker);

				if (this.model.get('icon')) {
					this.model.get('marker').setIcon(this.model.get('icon'));
					this.model.get('marker').riseOnHover = true;
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
		                    offset: L.point(0, -30)
		                })
		                .setLatLng(latlng)
		                .setContent(this.template(this.model.toJSON()));

		    this.model.set("popup", popup);

		    var actions = {
		        mouseover: function() {
		    		this.model.get('map').openPopup(popup);
		    		$(this.el).addClass('selected');
		    		
		    		// $('html').animate({ scrollTop: $(this.el).offset().top - 200}, 500);
		    		return false;
		    	},
		        mouseout: function() {
		            this.model.get('map').closePopup(popup);
		            $(this.el).removeClass('selected');
		            return false;
		        }
		    };

		    this.model.get('marker').on(actions, this);
		},

		showPopup: function() {
			if (this.model.get('popup') != null) {
				this.model.get('map').openPopup(this.model.get('popup'));
			}
		},

		hidePopup: function() {
			if (this.model.get('popup') != null) {
				this.model.get('map').closePopup(this.model.get('popup'));
			}
		}

	});

	return EventView;

});