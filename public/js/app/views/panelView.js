define(function(require) {

    var Backbone = require('backbone');
    var ReportBuilder = require('helpers/reportBuilder');
    var Panel = require('text!templates/panel.html');

    var panelView = Backbone.View.extend({
        el: '.dashboard__content',
        template: _.template(Panel),
        data: null,
        initialize: function(title, query) {

            var self = this;

            // Get data from report.
            ReportBuilder.get(query)
                .then(function(response) {
                    self.data = response;
                    self.render();
                })
                .catch(function(errMsg) {
                    self.noConnection(errMsg);
                });
        },
        render: function() {
            console.log(this.data);
            this.$el.append(this.template({
                data: this.data
            }));
        },
        noConnection: function(errMsg) {
            this.$el.append(this.template({
                data: errMsg,
                error: true
            }));
        }
    });

    return panelView;
});