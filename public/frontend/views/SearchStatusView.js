define(['underscore', 'backbone'], function(_, Backbone) {

	var SearchStatusView = Backbone.View.extend({
		
		el: '.info-block',

		tplNotFound: _.template('<h4>Not found</h4>'),

		tplFound: _.template('<h4><%= total %> upcoming events found</h4>'),

		tplLoaded: _.template('<h2>Loading <%= page * 10 %> of <%= total %></h2>'),

		tplFinished: _.template('<h2>Finished <%= total %> of <%= total %></h2>'),

		initialize: function() {

		},

		render: function() {

			this.$el.show();

			if (this.model.get('page') != this.model.get('totalPages')) {
				this.$el.html(this.tplFound(this.model.toJSON()) + this.tplLoaded(this.model.toJSON()));
			} else {
				this.$el.html(this.tplFound(this.model.toJSON()) + this.tplFinished(this.model.toJSON()));
			}

			if (!this.model.get('totalPages')) {
				this.$el.html(this.tplNotFound());
			}

		}

	});

	return SearchStatusView;

});