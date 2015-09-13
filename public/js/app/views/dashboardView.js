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

            this.panel = new PanelView('Page Views', {
                'ids': 'ga:' + Connection.get('profileId'),
                'metrics': 'rt:pageviews',
                'dimensions': 'rt:pagePath',
                'sort': 'rt:pageviews'
            });
        }
    });

    return dashboardView;
});