define(function(require) {

    var Backbone = require('backbone');

    var Connection = Backbone.Model.extend({
        attributes: {
            accountId: null,
            propertyId: null,
            profileId: null
        }
    });

    return new Connection;
});