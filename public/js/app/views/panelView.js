define(function(require) {

    var Backbone        = require('backbone');
    var ReportBuilder   = require('helpers/reportBuilder');
    var Panel           = require('text!templates/panel.html');

    var HeaderView      = require('views/panels/headerView');
    var ErrorView       = require('views/panels/errorView');
    var ActiveUsersView = require('views/panels/activeUsersView');
    var DevicesView     = require('views/panels/devicesView');

    var panelView = Backbone.View.extend({
        el: '.dashboard__content',
        template: _.template(Panel),
        initialize: function(panel, query) {

            var self = this;

            // Get data from report.
            ReportBuilder.get(query)
                .then(function(response) {
                    var panelView = self.getPanel(response, panel);
                    self.render({
                        header: panelView.header.el,
                        body: panelView.body.el
                    });
                })
                .catch(function(errMsg) {
                    var panelView = self.getPanel(errMsg);
                    self.render({
                        header: panelView.header.el,
                        body: panelView.body.el
                    });
                });
        },
        getPanel: function(data, panel) {
            switch (panel) {
                case 'activeUsers':
                    return {
                        header: new HeaderView('Active Users'),
                        body: new ActiveUsersView(data)
                    }
                break;
                case 'devices':
                    return {
                        header: new HeaderView('Devices'),
                        body: new DevicesView(data)
                    }
                break;
                default:
                    return {
                        header: new HeaderView('Error!'),
                        body: new ErrorView(data)
                    }
                break;
            }
        },
        render: function(viewObj) {
            this.$el.append(this.template(viewObj));
        }
    });

    return panelView;
});