define(['backbone',
		'models/AutocompleteItem'
], function(Backbone, AutocompleteItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: AutocompleteItem,

		getElement: function() {
			return this.currentElement;
		},

		setElement: function(model) {
			this.currentElement = model;
		},

		setSelected: function() {
			var selected = this.findWhere({selected: true});

			if (selected) {
				selected.set({selected: false});
			}

			this.setElement(selected);
			return selected;
		},

		next: function () {
			if (this.setSelected() && this.indexOf(this.getElement()) + 1 != this.length) {
				this.setElement(this.at(this.indexOf(this.getElement()) + 1));
			} else {
				this.setElement(this.at(0));
			}

			if (typeof this.getElement() != 'undefined') {
				this.getElement().set({selected: true});
			}
		},
		
		prev: function() {
			if (this.setSelected() && this.indexOf(this.getElement()) != 0) {
				this.setElement(this.at(this.indexOf(this.getElement()) - 1));
			} else {
				this.setElement(this.at(this.length - 1));
			}

			if(typeof this.getElement() != 'undefined') {
				this.getElement().set({selected: true});
			}
		}

	});

});