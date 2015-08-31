define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var ConnectList = require('text!templates/connectList.html')

    var connectListView = Backbone.View.extend({
        el: '.connect-box',
        template: _.template(ConnectList),
        events: {
            'click .connect-list__link' : 'selectListItem'
        },
        initialize: function(items, callback) {
            if(items && items.length) {
                this.items = this.buildItemsList(items);
                this.callback = callback;
                this.render();
            }
        },
        buildItemsList: function(items) {
            var itemsList = [];

            items.forEach(function(item) {
                var entry = {
                    name: item.name,
                    id: item.id
                };
                itemsList.push(entry);
            });

            return itemsList;
        },
        selectListItem: function(e) {
            var itemId = $(e.target).data('item-id');
            this.callback(itemId);
            this.$el.off('click', '.connect-list__link');
            return false;
        },
        render: function() {
            this.$el.html(this.template({
                items: this.items
            }));
        }
    });

    return connectListView;
});