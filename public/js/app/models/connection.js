define(function(require) {

    var Backbone = require('backbone');

    var Connection = Backbone.Model.extend({
        defaults: {
            accountId: null,
            propertyId: null,
            profileId: null
        }
    });

    return new Connection;
});