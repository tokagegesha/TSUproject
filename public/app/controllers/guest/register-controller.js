define([
    '../module',
    'angular'
], function (module) {
    'use strict';

    return module.controller('guest_registerController', function ($scope, $state, $stateParams, sessionManager, formValidator) {
        // COde Here
        $scope.errors = null;
        $scope.credentials = {};
        $scope.register = function () {
            console.log($scope.credentials);
        }
    });
});