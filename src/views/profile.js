define(function(require) {

    var $           = require('jquery');
    var _           = require('underscore');
    var Backbone    = require('backbone');
    var ProfileList = require('text!templates/profileList.html');

    var profileView = Backbone.View.extend({
        el: '.container',
        template: _.template(ProfileList),
        events: {
            'click .profile-list__link' : 'selectProfile'
        },
        init: function(options) {
            this.parent = options.parent;
            this.profiles = this.buildProfileList(options.profiles);
            this.render();
        },
        buildProfileList: function(profiles) {
            var profilesList = [];

            profiles.forEach(function(profile) {
                var entry = {
                    name: profile.name,
                    id: profile.id
                };

                profilesList.push(entry);
            });

            return profilesList;
        },
        selectProfile: function(e) {
            var profileId = $(e.target).data('profile-id');
            this.parent.state.profileId = profileId;
            this.parent.renderReport();
            return false;
        },
        render: function() {
            this.$el.append(this.template({
                profiles : this.profiles
            }));
        }
    });

    return new profileView;
});