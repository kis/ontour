define(['underscore', 
		'backbone', 
		'marionette',
		'channel'
], function(_, Backbone, Marionette, channel) {
	'use strict';

	return Backbone.Marionette.ItemView.extend({
		
		el: '#status',

		tplNotFound: _.template('<h3>Not found</h3>'),

		tplLoaded: _.template('<h3>Loading <%= page * 10 %> of <%= total %></h3>'),

		tplFinished: _.template('<h3>Finished <%= total %> of <%= total %></h3>'),

		initialize: function() {
			channel.trigger('reset');

			// this.model.on('change', this.render, this);
		},

		render: function() {

			this.$el.show();

			if (this.model.get('page') < this.model.get('totalPages')) {
				this.$el.html(this.tplLoaded(this.model.toJSON()));
			} else {
				this.$el.html(this.tplFinished(this.model.toJSON()));
				
				channel.trigger('addPaths');
			}

			if (!this.model.get('totalPages')) {
				this.$el.html(this.tplNotFound());
			}

		},

	});

});