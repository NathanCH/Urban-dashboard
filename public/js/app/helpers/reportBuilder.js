define(function(require) {

    var reportBuilder = {
        get: function(query) {
            var self = this;
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
        buildReport: function(rawReport) {
            var lastUpdated = rawReport['headers']['Date'];
            var tableData = rawReport['result']['rows'] || [];
            var resultCount = rawReport['result']['totalResults'] || 0;

            return {
                'Last Updated': lastUpdated,
                'Table Data': tableData,
                'Results': resultCount
            }
        }
    }

    return reportBuilder;
});