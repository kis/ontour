define(['underscore', 'backbone'], function(_, Backbone) {

	var SearchStatusView = Backbone.View.extend({
		
		el: '.info-block',

		tplNotFound: _.template('<h4>Not found</h4>'),

		tplFound: _.template('<h4> <%= total %> upcoming events found</h4>' +
							 '<h2><span class="loaded">Loading <%= page * 10 %> </span> of <%= total %></h2>'),

		initialize: function() {

		},

		render: function() {

			console.log(this.model.toJSON());
			this.$el.show().html(this.tplFound(this.model.toJSON()));

		}

	});

	return SearchStatusView;

});