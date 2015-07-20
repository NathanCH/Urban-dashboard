define(function(require) {

    var $               = require('jquery');
    var _               = require('underscore');
    var Backbone        = require('backbone');
    var Connection      = require('helpers/connect');

    var dashboardView = Backbone.View.extend({
        init: function() {
            this.renderConnect();
            this.connect();
        },
        connect: function() {
            var dashboard = this;

            Connection.authenticate().then(
                function(saved) {
                    return Connection.queryAccounts();
                },
                function(error) {
                    return Connection.handleError(error);
                }
            ).then(
                function(response) {
                    return Connection.handleAccounts(response);
                },
                function(error) {
                    return Connection.handleError(error);
                }
            ).then(
                function(accounts) {
                    return dashboard.renderAccounts(accounts);
                }
            );
        },
        renderConnect: function() {
            console.log('Connecting to Google Analytics...');
        },
        renderAccounts: function(accounts) {
            accounts.forEach(account) {
                console.log(account.name);
            }
        }
    });

    return new dashboardView;
});