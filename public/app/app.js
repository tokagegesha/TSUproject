define([
    'angular',
    'angular-ui-router',
    'angular-animate',
    'ui-bootstrap',
    './services/index',
    './controllers/index'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'app.services',
        'app.controllers'
    ]).run(function ($rootScope, $state, sessionManager) {
        $rootScope.sessionData = null;
        $rootScope.$on('sessionDataChanged', function (event, sessionData) {
            $rootScope.sessionData = sessionData;
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            sessionManager.retrieveSession(function (err, res) {
                //noinspection JSUnresolvedVariable
                var redirectToState,
                    stateRoot = toState.name.split('.')[0];
                if (err) {
                    switch (stateRoot) {
                        case 'member':
                            redirectToState = 'guest.login';
                            break;
                    }
                } else if (res) {
                    switch (stateRoot) {
                        case 'home':
                        case 'guest':
                            redirectToState = 'member.home';
                            break;
                    }
                }

                if (redirectToState) {
                    $state.go(redirectToState);
                }
            });
        });
    });
});
