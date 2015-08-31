define(function(require) {

    var Backbone  = require('backbone');

    var indexView = Backbone.View.extend({
        el: '.container',
        events: {
            'click .connect-prompt__button' : 'connect'
        },
        connect: function() {
            Backbone.history.navigate('connect', true);
        }
    });

    return indexView;
});