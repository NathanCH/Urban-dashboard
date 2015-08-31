define(function(require) {

    var Backbone = require('backbone');
    var IndexController = require('controllers/indexController');
    var ConnectController = require('controllers/connectController');

    var Router = Backbone.Router.extend({
        initialize: function() {
            Backbone.pubSub = _.extend({}, Backbone.Events);
            Backbone.history.start({
                pushState: false
            });
        },
        routes: {
            '': 'index',
            '*connect': 'connect'
        },
        index: function() {
            IndexController.init();
        },
        connect: function() {
            ConnectController.init();
        }
    });

    return Router;
});