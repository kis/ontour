define(['underscore',
		'backbone',
		'marionette'
], function(_, Backbone) {
	'use strict';

	return Backbone.Marionette.ItemView.extend({

		el: '#search',

		events: {
			'click #tabs' : 'setActiveTab'
		},

		initialize: function() {
			this.model.on('change', this.updateMenu, this);
		},

		render: function() {

		},

		setActiveTab: function(e) {
			this.model.set('activeTab', $(e.target).attr('id'));
		},

		updateMenu: function() {
			this.$el.find('a').removeClass('active');

			if (this.model.get('activeTab') == 'artist') {
				this.$el.find('.search-field').attr('placeholder', 'Enter artist name..').end()
						.find('#artist').addClass('active');
			} else if (this.model.get('activeTab') == 'city') {
				this.$el.find('.search-field').attr('placeholder', 'Enter country or city..').end()
						.find('#city').addClass('active');
			}
		}

	});

});