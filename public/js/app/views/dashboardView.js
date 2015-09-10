define(function(require) {

    var Backbone  = require('backbone');
    var Connection = require('models/connection');
    var DashboardLayout = require('text!templates/dashboardLayout.html')
    var HeaderView = require('views/headerView');
    var SidebarView = require('views/sidebarView');

    var dashboardView = Backbone.View.extend({
        el: '.container',
        template: _.template(DashboardLayout),
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            this.header = new HeaderView();
            this.sidebar = new SidebarView();

            // Bind toggle event to sidebar and pass context of sidebar.
            this.header.bind('toggle', _.bind(this.sidebar.toggle, this.sidebar));

            // this.panel = new PanelView('usersOnline', {
            //     property : value
            // });
            // this.sidebar.close();
        }
    });

    return dashboardView;
});