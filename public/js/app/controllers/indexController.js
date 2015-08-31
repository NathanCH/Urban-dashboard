define(function(require) {

    var IndexView = require('views/indexView');

    var indexController = {
        init: function() {
            new IndexView()
        }
    };

    return indexController;
});