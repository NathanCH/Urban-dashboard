define(function(require) {

	var Backbone = require('backbone');
	var ActiveUsers = require('text!templates/panels/activeUsers.html')

	var activeUsersView = Backbone.View.extend({
		template: _.template(ActiveUsers),
		initialize: function(data) {
			this.el = this.template(data);
		}
	});

	return activeUsersView;
});