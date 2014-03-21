define(['underscore', 'backbone'], function(_, Backbone) {

	var SearchStatusView = Backbone.View.extend({
		
		tagName: 'div class="info-block"',

		template: _.template('<h4>Not found</h4>'),

		initialize: function() {

		},

		render: function() {

		}

	});

	return SearchStatusView;

});