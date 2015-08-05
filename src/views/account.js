define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var AccountList = require('text!templates/accountList.html');

    var accountView = Backbone.View.extend({
        el: '.container',
        template: _.template(AccountList),
        events: {
            'click .account-list__link' : 'selectAccount'
        },
        init: function(options) {
            this.parent = options.parent;
            this.accounts = this.buildAccountList(options.accounts);
            this.render();
        },
        buildAccountList: function(accounts) {
            var accountsList = [];

            accounts.forEach(function(account) {
                var entry = {
                    name: account.name,
                    id: account.id
                }
                accountsList.push(entry);
            });

            return accountsList;
        },
        selectAccount: function(e) {
            var accountId = $(e.target).data('account-id');
            this.parent.state.accountId = accountId;
            this.parent.query('property');
            return false;
        },
        render: function() {
            this.$el.html(this.template({
                accounts : this.accounts
            }));
            return this;
        }
    });

    return new accountView;
});