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
            var authData = this.defaults.authData;

            return new Promise(function(saved, rejected) {
                gapi.auth.authorize(authData, function(response) {
                    if(!response.error) {
                        saved();
                    }
                    else{
                        rejected(Error('Could not connect to Google Analytics.'));
                    }
                });
            });
        },
        queryAccounts: function() {
            var self = this;

            return new Promise(function(saved) {
                gapi.client.load('analytics', 'v3').then(function(){
                    gapi.client.analytics.management.accounts.list().then(function(){
                        gapi.client.analytics.management.accounts.list().then(saved);
                    });
                });
            });
        },
        queryProperties: function(accountId) {
            return new Promise(function(saved, rejected) {
                gapi.client.analytics.management.webproperties.list({'accountId': accountId})
                    .then(saved)
                    .then(null, function(err) {
                      rejected(Error('No properites found.'));
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
        handleError: function(errorMessage) {
            console.log(errorMessage);
        }
    });

    return new connect;
});