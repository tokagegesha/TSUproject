define([
    '../module',
    'angular'
], function (module) {
    'use strict';

    return module.controller('guest_registerController', function ($scope, $state, $stateParams, userManager, formValidator) {

        $scope.errors = null;
        $scope.credentials = {};
        $scope.register = function () {
            userManager.registerUser($scope.credentials,function(err,res){

            })
        }
    });
});