require.config({
    baseUrl: 'assets',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'twbs': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'angular': 'bower_components/angular/angular.min',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-animate': 'bower_components/angular-animate/angular-animate.min',
        'angular-touch': 'bower_components/angular-animate/angular-touch.min',
        'ui-bootstrap': 'bower_components/ui-bootstrap/dist/ui-bootstrap-1.3.3.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        'twbs': {
            deps: ['jquery']
        }
    }
});

require([
    '../../app/bootstrap'
], function () {
    console.log('Angular Bootstrap loaded.');
});
