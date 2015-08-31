define(function(require) {

    var Backbone = require('backbone');

    var Connection = Backbone.Model.extend({
        accountId: null,
        propertyId: null,
        profileId: null
    });

    return Connection;
});