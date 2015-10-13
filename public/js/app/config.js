require.config({
    namespace: 'App',
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        text: '../lib/require.text',
        async: '../lib/require.async',
        json: '../lib/require.json'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['router', 'async!https://apis.google.com/js/client.js!onload'],

    function(Router, gapi) {

        var App = {
            router: {},
            models: {},
            collections: {},
            views: {},
            init: function() {
                App.router = new Router();

                // Enable button when Router & GAPI have loaded.
                $('.connect-prompt__button').removeAttr('disabled').text('Allow Access');
            }
        }

        new App.init();
    }
);