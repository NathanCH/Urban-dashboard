define(function(require) {

    var analyticsHelper = {
        authData: {
            client_id: '893266724164-5o0c8vjpmq78vff92nsaukj0e0ldebvm.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/analytics.readonly',
            immdiate: true
        },
        authenticate: function() {
            if(typeof gapi !== 'undefined') {
                var authData = this.authData;
                return new Promise(function(saved, rejected) {
                    gapi.auth.authorize(authData, function(response) {
                        response.error ? rejected('Could not connect to Google Analytics') : saved();
                    });
                });
            }
        },
        getAccounts: function() {
            return new Promise(function(saved, rejected) {
                gapi.client.load('analytics', 'v3').then(function(){
                    gapi.client.analytics.management.accounts.list().then(function(){
                        gapi.client.analytics.management.accounts.list()
                            .then(saved)
                            .then(null, function(err) {
                                rejected(Error('Could not get accounts.'));
                        });
                    });
                });
            });
        },
        getProperties: function(accountId) {
            return new Promise(function(saved, rejected) {
                gapi.client.analytics.management.webproperties
                    .list({
                        'accountId': accountId
                    })
                    .then(saved)
                    .then(null, function(err) {
                      rejected(Error('Could not get properties.'));
                });
            });
        },
        getProfiles: function(accountId, propertyId) {
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
        }
    }

    return analyticsHelper;
});