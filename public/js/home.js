(function() {
	'use strict';

	window.App = {};

	App.Home = Backbone.Model.extend({
		defaults: {
			activeTab: 'signup'
		}
	});

	var home = new App.Home();

	App.HomeView = Marionette.ItemView.extend({
	
		el: '#area',

		ui: {
			tabs: '#homepage a',
			signup: '#signup',
			signin: '#signin',
			registrationArea: '#registration-area',
			loginArea: '#login-area'
		},

		events: {
			'click @ui.signup' : 'showSignup',
			'click @ui.signin' : 'showSignin'
		},

		initialize: function() {
			this.bindUIElements();
			this.ui.loginArea.hide();
			this.listenTo(this.model, 'change', this.updateView);
		},

		showSignup: function() {
			this.model.set('activeTab', 'signup');
		},

		showSignin: function() {
			this.model.set('activeTab', 'signin');
		},

		updateView: function() {
			this.bindUIElements();
			this.ui.tabs.removeClass('active');

			if (this.model.get('activeTab') == 'signup') {
				this.ui.signup.addClass('active');
				this.ui.loginArea.hide();
				this.ui.registrationArea.show();
			} else if (this.model.get('activeTab') == 'signin') {
				this.ui.signin.addClass('active');
				this.ui.registrationArea.hide();
				this.ui.loginArea.show();
			}
		}

	});

	var homeView = new App.HomeView({model: home});

})();