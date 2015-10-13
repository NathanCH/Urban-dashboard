define(function(require) {

    var Backbone        = require('backbone');
    var ReportBuilder   = require('helpers/reportBuilder');
    var Panel           = require('text!templates/panel.html');
    var Definitions     = require('json!definitions/en.json');

    var HeaderView      = require('views/panels/headerView');
    var ErrorView       = require('views/panels/errorView');
    var ActiveUsersView = require('views/panels/activeUsersView');
    var DevicesView     = require('views/panels/devicesView');

    var panelView = Backbone.View.extend({
        el: '.dashboard__content',
        template: _.template(Panel),
        initialize: function(panel) {

            var self = this;
            var definition = self.getDefinition(panel);
            var query = definition.query;

            // Get data from report.
            ReportBuilder.get(query)
                .then(function(response) {
                    var panelView = self.getPanel(response, definition);
                    self.render({
                        header: panelView.header.el,
                        body: panelView.body.el
                    });
                })
                .catch(function(errMsg) {
                    var errDefinition = self.getDefinition('error');
                    var panelView = self.getPanel(errMsg, errDefinition);
                    self.render({
                        header: panelView.header.el,
                        body: panelView.body.el
                    });
                });
        },
        getPanel: function(panelData, definition) {
            var panelTitle = definition.title;
            var panelView = definition.view;

            // Dynamically create panel view.
            var panelInstance = require('views/panels/' + panelView);

            return {
                header: new HeaderView(panelTitle),
                body: new panelInstance(panelData)
            }
        },
        getDefinition: function(name) {
            return Definitions['panel'][name];
        },
        render: function(viewObj) {
            this.$el.append(this.template(viewObj));
        }
    });

    return panelView;
});