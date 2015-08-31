define(function(require) {

    var Backbone     = require('backbone');
    var ConnectedMsg = require('text!templates/connectedMsg.html')

    var connectedView = Backbone.View.extend({
        el: '.connect-box',
        template: _.template(ConnectedMsg),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
        }
    });

    return connectedView;
});