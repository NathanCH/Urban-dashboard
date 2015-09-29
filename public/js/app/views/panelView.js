define(function(require) {

    var Backbone        = require('backbone');
    var ReportBuilder   = require('helpers/reportBuilder');
    var Panel           = require('text!templates/panel.html');

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
                    self.render({
                        content: self.getPanel(response, panel)
                    });
                })
                .catch(function(errMsg) {
                    self.render({
                        content: self.getPanel(errMsg)
                    });
                });
        },
        getPanel: function(data, panel) {
            switch (panel) {
                case 'activeUsers':
                    var panel = new ActiveUsersView(data);
                break;
                case 'devices':
                    var panel = new DevicesView(data);
                break;
                default:
                    var panel = new ErrorView(data);
                break;
            }

            return panel.el;
        },
        render: function(viewObj) {
            this.$el.append(this.template(viewObj));
        }
    });

    return panelView;
});