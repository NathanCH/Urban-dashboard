require.config({
	paths: {
		jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery',
		underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
		backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
		text: '../thirdparty/require.text',
		async: '../thirdparty/require.async'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['app', 'async!https://apis.google.com/js/client.js!onload'], function(App, gapi) {
	App.init();
});