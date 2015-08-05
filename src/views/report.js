define(function(require) {

    var $           = require('jquery');
    var Backbone    = require('backbone');
    var Report      = require('helpers/reportBuilder');

    var report = Backbone.Model.extend({
        init: function() {
            this.newReport();
        },
        newReport: function() {
            Report.get(Connection.state.profileId).then(
                function(reportData) {
                    return Report.renderReport(reportData);
                },
                function(error) {
                    return Report.handleError(error);
                }
            );
        }
    });

});