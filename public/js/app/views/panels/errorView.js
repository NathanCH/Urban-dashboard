define(function(require) {

	var Backbone = require('backbone');
	var Error = require('text!templates/panels/error.html')

	var errorView = Backbone.View.extend({
		template: _.template(Error),
		initialize: function(data) {
			this.el = this.template(data);
		}
	});

	return errorView;
});