define(function(require) {

    var Backbone        = require('backbone');
    var ConnectView     = require('views/connect');
    var ReportView      = require('views/report');

    var dashboardView = Backbone.View.extend({
        init: function() {
            this.connect();
        },
        connect: function() {
            ConnectView.connect();
        },
        report: function() {
            ReportView.init();
        }
    });

    return new dashboardView;
});