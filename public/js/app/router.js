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
            'dashboard/:page': 'gotoPage'
        },
        index: function() {
            IndexController.init();
        },
        connect: function() {
            ConnectController.init();
        },
        dashboard: function() {
            DashboardController.init();
        },
        gotoPage: function(page) {
            switch(page) {
                case 'topPages':
                    DashboardController.topPages();
                break;
                case 'trends':
                    DashboardController.trends();
                break;
                default:
                    DashboardController.notFound();
                break;
            }
        }
    });

    return Router;
});