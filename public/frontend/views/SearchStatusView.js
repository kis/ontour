define(['underscore', 'backbone', 'channel'], function(_, Backbone, channel) {

	var SearchStatusView = Backbone.View.extend({
		
		el: '.info-block',

		tplNotFound: _.template('<h3>Not found</h3>'),

		tplLoaded: _.template('<h3>Loading <%= page * 10 %> of <%= total %></h3>'),

		tplFinished: _.template('<h3>Finished <%= total %> of <%= total %></h3>'),

		initialize: function() {
			channel.trigger('reset');
		},

		render: function() {

			this.$el.show();

			if (this.model.get('page') != this.model.get('totalPages')) {
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

	return SearchStatusView;

});