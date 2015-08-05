define(function(require) {

    var $               = require('jquery');
    var _               = require('underscore');
    var Backbone        = require('backbone');
    var PropertyList    = require('text!templates/propertyList.html');

    var propertyView = Backbone.View.extend({
        el: '.container',
        template: _.template(PropertyList),
        events: {
            'click .property-list__link' : 'selectProperty'
        },
        init: function(options) {
            this.parent = options.parent;
            this.properties = this.buildPropertiesList(options.properties);
            this.render();
        },
        buildPropertiesList: function(properties) {
            var propertiesList = [];

            properties.forEach(function(property) {
                var entry = {
                    name: property.name,
                    id: property.id
                }
                propertiesList.push(entry);
            });

            return propertiesList;
        },
        selectProperty: function(e) {
            var propertyId = $(e.target).data('property-id');
            this.parent.state.propertyId = propertyId;
            this.parent.query('profile');
            return false;
        },
        render: function() {
            this.$el.append(this.template({
                properties : this.properties
            }));
        }
    });

    return new propertyView;
});