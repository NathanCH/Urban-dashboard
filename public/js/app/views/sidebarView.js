define(function(require) {

    var Backbone = require('backbone');
    var SidebarBody = require('text!templates/sidebarBody.html');

    var sidebarView = Backbone.View.extend({
        el: '.dashboard__sidebar',
        template: _.template(SidebarBody),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
        },
        toggle: function() {
            this.$el.toggleClass('dashboard__sidebar--minimized');
        }
    });

    return sidebarView;
});