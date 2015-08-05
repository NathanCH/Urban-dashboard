define(function(require) {

    var $           = require('jquery');
    var Backbone    = require('backbone');

    var reportBuilder = Backbone.Model.extend({
        profileId: null,
        get: function(profileId) {
            var self = this;
            return new Promise(function(saved, rejected) {
                if(typeof profileId === "undefined") {
                    rejected(Error('Must provide profile ID.'));
                }

                gapi.client.analytics.data.realtime.get({
                    'ids': 'ga:' + profileId,
                    'metrics': 'rt:pageviews',
                    'dimensions': 'rt:pagePath',
                    'sort': 'rt:pageviews'
                })
                .then(function(response) {
                    var report = self.buildReport(response);
                    saved(report);
                })
                .then(null, function(errorMessage) {
                    rejected(Error(errorMessage));
                });
            });
        },
        buildReport: function(rawReport) {
            var lastUpdated = rawReport['headers']['Date'];
            var tableData = rawReport['result']['rows'] || [];
            var resultCount = rawReport['result']['totalResults'] || 0;

            return {
                'Last Updated': lastUpdated,
                'Table Data': tableData,
                'Results': resultCount
            }
        },
        renderReport: function(report) {
            console.log(report);
        },
        handleError: function(errorMessage) {
            console.log(errorMessage);
        }
    });

    return new reportBuilder;
});