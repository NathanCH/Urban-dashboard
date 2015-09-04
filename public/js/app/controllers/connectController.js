define(function(require) {

    var AnalyticsHelper = require('helpers/analyticsHelper');
    var Connection      = require('models/connection');
    var ConnectView     = require('views/connectView');
    var ConnectListView = require('views/connectListView');
    var ConnectedView   = require('views/connectedView');

    var connectController = {
        init: function() {
            this.connection = Connection;
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
                new ConnectListView(response.result.items, function(accountId) {
                    self.connection.set({'accountId': accountId});
                    self.selectProperty(accountId);
                });
            });
        },
        selectProperty: function(accountId) {
            var self = this;
            AnalyticsHelper.getProperties(accountId).then(function(response) {
                new ConnectListView(response.result.items, function(propertyId) {
                    self.connection.set({
                        'propertyId': propertyId
                    });
                    self.selectProfile(accountId, propertyId);
                });
            });
        },
        selectProfile: function(accountId, propertyId) {
            var self = this;
            AnalyticsHelper.getProfiles(accountId, propertyId).then(function(response) {
                new ConnectListView(response.result.items, function(profileId) {
                    self.connection.set({'profileId': profileId});
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