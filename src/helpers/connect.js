define(function(require) {

    var $ = require('jquery');
    var Backbone = require('backbone');

    var connect = Backbone.Model.extend({
        defaults: {
            authData: {
                client_id: '893266724164-5o0c8vjpmq78vff92nsaukj0e0ldebvm.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/analytics.readonly',
                immdiate: true
            }
        },
        authenticate: function() {
            var authData = this.defaults.authData,
                errMsg = 'Could not connect to Google Analytics.';

            return new Promise(function(saved, rejected) {
                gapi.auth.authorize(authData, function(response) {
                    response.error ? rejected(errMsg) : saved();
                });
            });
        },
        queryAccounts: function() {
            var self = this;

            return new Promise(function(saved, rejected) {
                gapi.client.load('analytics', 'v3').then(function(){
                    gapi.client.analytics.management.accounts.list().then(function(){
                        gapi.client.analytics.management.accounts.list()
                            .then(saved)
                            .then(null, function(err) {
                                rejected(Error('Could not query accounts.'));
                        });
                    });
                });
            });
        },
        handleAccounts: function(response) {
            var accounts = response.result.items;

            return new Promise(function(saved, rejected) {
                if(accounts && accounts.length) {
                      saved(accounts);
                }

                else{
                    rejected(Error('No accounts found.'));
                }
            });
        },
        queryProperties: function(accountId) {
            return new Promise(function(saved, rejected) {
                gapi.client.analytics.management.webproperties
                    .list({
                        'accountId': accountId
                    })
                    .then(saved)
                    .then(null, function(err) {
                      rejected(Error('Could not query properties.'));
                });
            });
        },
        handleProperties: function(response) {
            var properties = response.result.items;

            return new Promise(function(saved, rejected) {
                if(properties && properties.length) {
                    saved(properties);
                }

                else{
                    rejected(Error('No properties found.'));
                }
            });
        },
        queryProfiles: function(accountId, propertyId) {
            return new Promise(function(saved, rejected) {
                gapi.client.analytics.management.profiles.list({
                    'accountId': accountId,
                    'webPropertyId': propertyId
                })
                .then(saved)
                .then(null, function(err) {
                    rejected(Error('Could not query profiles.'));
                });
            });
        },
        handleProfiles: function(response) {
            var profiles = response.result.items;

            return new Promise(function(saved, rejected) {
                if(profiles && profiles.length) {
                    saved(profiles);
                }

                else{
                    rejected(Error('No profiles found.'));
                }
            });
        },
        handleError: function(errorMessage) {
            console.log(errorMessage);
        }
    });

    return new connect;
});