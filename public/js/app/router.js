define(function(require) {

    var Backbone = require('backbone');
    var IndexController = require('controllers/indexController');
    var ConnectController = require('controllers/connectController');
    var DashboardController = require('controllers/dashboardController');

    var Router = Backbone.Router.extend({
        initialize: function() {
            Backbone.pubSub = _.extend({}, Backbone.Events);
            Backbone.history.start({
                pushState: false
            });
        },
        routes: {
            '': 'index',
            'connect': 'connect',
            'dashboard': 'dashboard',
            'dashboard/:page' : 'dashboard'
        },
        index: function() {
            IndexController.init();
        },
        connect: function() {
            ConnectController.init();
        },
        dashboard: function(page) {
            DashboardController.init();
            var page = page || 'index';
            DashboardController.newDashboard(page);
        }
    });

    return Router;
});