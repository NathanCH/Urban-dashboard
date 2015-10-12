define(function(require) {

    var Connection = require('models/connection');

    var reportBuilder = {
        get: function(queryData) {
            var self = this;
            var query = self.bindConnection(queryData);

            return new Promise(function(saved, rejected) {
                if(typeof gapi.client.analytics != "undefined") {
                    // Query google analytics realtime API.
                    gapi.client.analytics.data.realtime.get(query)
                        .then(function(response) {
                            saved(self.buildReport(response));
                        })
                        .then(null, function() {
                            rejected('Could not query real time api.');
                        });
                }

                else{
                    rejected('Could not load analyics API.');
                }
            });
        },
        bindConnection: function(queryData) {
            queryData['ids'] = 'ga:' + Connection.get('profileId');
            return queryData;
        },
        buildReport: function(rawReport) {
            var lastUpdated = rawReport['headers']['Date'];
            var tableData = rawReport['result']['rows'] || [];
            var resultCount = rawReport['result']['totalResults'] || 0;

            return {
                lastUpdated: lastUpdated,
                tableData: tableData,
                resultCount: resultCount
            }
        }
    }

    return reportBuilder;
});