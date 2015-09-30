define(function(require) {

	var Backbone = require('backbone');
	var Header = require('text!templates/panels/header.html');

	var headerView = Backbone.View.extend({
		template: _.template(Header),
		initialize: function(title) {
			this.el = this.template({title: title});
		}
	});

	return headerView;
});