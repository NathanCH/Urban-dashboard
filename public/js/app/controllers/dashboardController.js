define(function(require) {

    var Connection = require('models/connection');
    var DashboardView = require('views/dashboardView')

    var dashboardController = {
        init: function() {
            this.dashboard = new DashboardView();
        },
        newDashboard: function(page) {
            if(typeof this.dashboard == 'undefined') {
                this.dashboard = new DashboardView();
            }
            this.dashboard.createDashboard(page);
        }
    };

    return dashboardController;
});