define([
    '../module',
    'angular'
], function (module, ng) {
    'use strict';

    return module.controller('guest_loginController', function ($scope,
                                                                $state,
                                                                $stateParams,
                                                                sessionManager,
                                                                userManager,
                                                                formValidator) {
        $scope.errors = null;
        $scope.credentials = {};

        $scope.login = function () {
            $scope.errors = formValidator.validate($scope.loginForm, {
                required: {
                    'username': 'გთხოვთ შეიყვანეთ მომხმარებლის სახელი.',
                    'password': 'გთხოვთ შეიყვანეთ პაროლი.'
                }
            });

            if (!$scope.errors) {
                var credentials = ng.copy($scope.credentials);
                userManager.login(credentials, function (err, res) {
                    if (err) {
                        $scope.errors = err.errors;
                    } else if (res) {
                        sessionManager.login(function (err, res) {
                            
                        })
                        $state.go('member.home');
                    }
                });
            }
        };
    });
});