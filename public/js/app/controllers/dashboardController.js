define(function(require) {

    var Connection = require('models/connection');
    var DashboardView = require('views/dashboardView')

    var dashboardController = {
        init: function() {
            this.dashboard = new DashboardView();
        },
        topPages: function() {
            if(typeof this.dashboard != 'undefined') {
                this.dashboard.topPages();
            }
            else {
                new DashboardView();
            }
        },
        trends: function() {
            if(typeof this.dashboard != 'undefined') {
                this.dashboard.trends();
            }
            else {
                new DashboardView();
            }
        },
        notFound: function() {
            console.log('page not found');
        }
    };

    return dashboardController;
});