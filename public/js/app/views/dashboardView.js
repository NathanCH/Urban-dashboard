define(function(require) {

    var Backbone  = require('backbone');
    var Connection = require('models/connection');
    var DashboardLayout = require('text!templates/dashboardLayout.html');
    var HeaderView = require('views/headerView');
    var SidebarView = require('views/sidebarView');
    var PanelView = require('views/panelView');
    var Definitions = require('json!definitions/en.json');

    var dashboardView = Backbone.View.extend({
        el: '.container',
        cached: [],
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
        },
        createDashboard: function(dashboard) {

            // Get dashboard data.
            var data = this.getDefinitions(dashboard);

            if(typeof data != "undefined") {
                var title = data.title;
                var panelsArray = data.panels;

                // Create dashboard title and panels.
                this.createTitle(title);
                this.createPanels(panelsArray);
            }

            else{
                console.log('Page not found.');
            }
        },
        createTitle: function(title) {
            console.log(title);
        },
        createPanels: function(panelsArray) {
            var self = this;
            panelsArray.forEach(function(panel) {
                return new PanelView(panel);
            });
        },
        getDefinitions: function(name) {
            return Definitions['dashboard'][name];
        }
    });

    return dashboardView;
});