define(function(require) {

	var Backbone = require('backbone');
	var Devices = require('text!templates/panels/devices.html')

	var devicesView = Backbone.View.extend({
		template: _.template(Devices),
		initialize: function(data) {
			this.el = this.template(data);
		}
	});

	return devicesView;
});