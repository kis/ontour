'use strict';

import { Collection } from 'backbone';
import AutocompleteItem from '../models/AutocompleteItem';

export default class AutocompleteCollection extends Collection {
	
	constructor(props) {
		super(props);

		this.model = AutocompleteItem;
	}

	getElement() {
		return this.currentElement;
	}

	setElement(model) {
		this.currentElement = model;
	}

	setSelected() {
		var selected = this.findWhere({selected: true});

		if (selected) {
			selected.set({selected: false});
		}

		this.setElement(selected);
		return selected;
	}

	next() {
		if (this.setSelected() && this.indexOf(this.getElement()) + 1 != this.length) {
			this.setElement(this.at(this.indexOf(this.getElement()) + 1));
		} else {
			this.setElement(this.at(0));
		}

		if (typeof this.getElement() != 'undefined') {
			this.getElement().set({selected: true});
		}
	}
	
	prev() {
		if (this.setSelected() && this.indexOf(this.getElement()) != 0) {
			this.setElement(this.at(this.indexOf(this.getElement()) - 1));
		} else {
			this.setElement(this.at(this.length - 1));
		}

		if(typeof this.getElement() != 'undefined') {
			this.getElement().set({selected: true});
		}
	}

}