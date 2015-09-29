define(function(require) {

    var Backbone  = require('backbone');
    var Connection = require('models/connection');
    var DashboardLayout = require('text!templates/dashboardLayout.html')
    var HeaderView = require('views/headerView');
    var SidebarView = require('views/sidebarView');
    var PanelView = require('views/panelView');

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
            this.header.bind('toggleSidebar', _.bind(this.sidebar.toggle, this.sidebar));

            // Load index panels.
            this.dashboard();
        },
        dashboard: function() {
            this.$el.find('.dashboard__content').empty();
            this.activeUsersPanel = new PanelView('activeUsers', {
                'ids': 'ga:' + Connection.get('profileId'),
                'metrics': 'rt:activeUsers'
            });
            this.devicesPanel = new PanelView('devices', {
                'ids': 'ga:' + Connection.get('profileId'),
                'metrics': 'rt:activeUsers',
                'dimensions': 'rt:deviceCategory'
            });
        },
        topPages: function() {},
        trends: function() {}
    });

    return dashboardView;
});