define(function(require) {

    var Backbone = require('backbone');
    var HeaderBar = require('text!templates/headerBar.html')

    var headerView = Backbone.View.extend({
        el: '.dashboard__header',
        template: _.template(HeaderBar),
        events: {
            'click [data-toggle="sidebar"]' : 'toggleSidebar'
        },
        initialize: function() {
            this.render();
        },
        toggleSidebar: function() {
            this.trigger('toggle');
        },
        render: function() {
            this.$el.html(this.template());
        }
    });

    return headerView;
});