define(function(require) {

    var Backbone        = require('backbone');
    var Connection      = require('helpers/connect');
    var AccountView     = require('views/account');
    var PropertyView    = require('views/property');
    var ProfileView     = require('views/profile');

    var dashboardView = Backbone.View.extend({
        stateData: {
            accountId: null,
            propertyId: null,
            profileId: null
        },
        init: function() {
            this.accountId = null;
            this.renderConnectMsg();
            this.connect();
        },
        connect: function(action) {
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
        query: function(action) {
            var self = this;
            switch(action) {
                case 'property':

                    Connection.queryProperties(self.stateData.accountId).then(
                        function(response) {
                            return Connection.handleProperties(response);
                        },
                        function(error) {
                            return Connection.handleError(error);
                        }
                    ).then(
                        function(properties) {
                            return self.renderProperties(properties);
                        }
                    );
                break;
                case 'profile':
                    Connection.queryProfiles(self.stateData.accountId, self.stateData.propertyId).then(
                        function(response) {
                            return Connection.handleProfiles(response);
                        },
                        function(error) {
                            return Connection.handleError(error);
                        }
                    ).then(
                        function(profiles) {
                            return self.renderProfiles(profiles);
                        }
                    );
                break;
            }
        },
        renderConnectMsg: function() {
            console.log('Connecting to Google Analytics...');
        },
        renderAccounts: function(accounts) {
            AccountView.init({
                parent: this,
                accounts: accounts
            });
        },
        renderProperties: function(properties) {
            PropertyView.init({
                parent: this,
                properties: properties
            });
        },
        renderProfiles: function(profiles) {
            ProfileView.init({
                parent: this,
                profiles: profiles
            });
        }
    });

    return new dashboardView;
});