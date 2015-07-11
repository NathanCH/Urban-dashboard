define(function(require) {

    var $ = require('jquery');
    var Connection = require('models/connect');
    var Router = require('router');

    var init = function() {
        var connection = new Connection();
    }

	return{
        init: init
	}
});