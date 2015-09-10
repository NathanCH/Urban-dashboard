define(function(require) {

    var Connection = require('models/connection');
    var DashboardView = require('views/dashboardView')

    var dashboardController = {
        init: function() {
            this.dashboard = new DashboardView();
        }
    };

    return dashboardController;
});