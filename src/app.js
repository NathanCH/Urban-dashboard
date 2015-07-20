define(function(require) {

    var DashboardView = require('views/dashboard');

    var init = function() {
        var dashboard = DashboardView.init();
    }

    return{
        init: init
    }
});