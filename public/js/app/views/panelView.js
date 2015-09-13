define(function(require) {

    var Backbone = require('backbone');
    var ReportBuilder = require('helpers/reportBuilder');
    var Panel = require('text!templates/panel.html');

    var panelView = Backbone.View.extend({
        el: '.dashboard__content',
        template: _.template(Panel),
        initialize: function(title, query) {
            this.report = ReportBuilder.get(query);
        }
    });

    return panelView;
});