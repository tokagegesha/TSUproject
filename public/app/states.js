define([
    './app'
], function (app) {
    'use strict';

    return app.config(function ($urlRouterProvider, $stateProvider) {
        /**
         *
         * @type {Object}
         */
        var states = {
            'home': {
                url: '/home',
                templateUrl: '/app/views/home/home.html',
                controller: 'homeController'
            },

            'guest.login': {
                url: '/login',
                templateUrl: '/app/views/guest/login.html',
                controller: 'guest_loginController'
            },

            // ==================================================
            // Logout
            'logout': {
                url: '/logout',
                controller: function ($state, $stateParams, sessionManager) {
                    sessionManager.logout(function (err, res) {
                        if (err) {
                            alert(JSON.stringify(err));
                        } else if (res) {
                            $state.go('home');
                        }
                    });
                }
            },

            // ==================================================
            // Member
            'member': {
                abstract: true,
                url: '/member',
                templateUrl: 'angular-app/views/member/member.html',
                controller: 'memberController'
            },

            'member.home': {
                url: '/home',
                templateUrl: 'angular-app/views/member/home/home.html',
                controller: 'member_homeController'
            }
        };

        for (var i in states) {
            if (states.hasOwnProperty(i))
                $stateProvider.state(i, states[i]);
        }

        $urlRouterProvider.otherwise(states['home'].url);
    });
});
