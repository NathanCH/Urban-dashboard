define(function(require) {

    var AnalyticsHelper = require('helpers/analyticsHelper');
    var Connection      = require('models/connection');
    var ConnectView     = require('views/connectView');
    var ConnectListView = require('views/connectListView');
    var ConnectedView   = require('views/connectedView');

    var connectController = {
        init: function() {
            this.connection = new Connection();
            this.connectView = new ConnectView();
            this.authenticate();
        },
        authenticate: function() {
            var self = this;
            AnalyticsHelper.authenticate().then(
                function(saved) {
                    return self.selectAccount();
                },
                function(errorMsg) {
                    return self.errorHandler(errorMsg);
                }
            );
        },
        selectAccount: function() {
            var self = this;
            AnalyticsHelper.getAccounts().then(function(response) {
                new ConnectListView(response.result.items, function(itemId) {
                    self.selectProperty(itemId);
                });
            });
        },
        selectProperty: function(accountId) {
            var self = this;
            AnalyticsHelper.getProperties(accountId).then(function(response) {
                new ConnectListView(response.result.items, function(itemId) {
                    self.selectProfile(accountId, itemId);
                });
            });
        },
        selectProfile: function(accountId, propertyId) {
            var self = this;
            AnalyticsHelper.getProfiles(accountId, propertyId).then(function(response) {
                new ConnectListView(response.result.items, function(itemId) {
                    self.connected();
                });
            });
        },
        connected: function() {
            new ConnectedView();
        },
        errorHandler: function(errorMsg) {
            console.log(errorMsg);
        }
    };

    return connectController;
});