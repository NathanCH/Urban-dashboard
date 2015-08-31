define(function(require) {

    var Backbone = require('backbone');
    var ConnectBox = require('text!templates/connectBox.html')

    var connectView = Backbone.View.extend({
        el: '.container',
        template: _.template(ConnectBox),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.append(this.template());
        }
    });

    return connectView;
});