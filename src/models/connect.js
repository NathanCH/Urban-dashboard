define(function(require) {

    var $ = require()
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        initialize: function() {
            if(this.authorize()) {
                this.set('authorized', true);
            }
        },
        authorize: function() {
            gapi.auth.authorize(this.defaults.authData, function(response) {
                if(!response.error) {
                    return false;
                }
            });
        },
        defaults: {
            authorized: false,
            authData: {
                client_id: '893266724164-5o0c8vjpmq78vff92nsaukj0e0ldebvm.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/analytics.readonly',
                immdiate: true
            }
        }
    });
});