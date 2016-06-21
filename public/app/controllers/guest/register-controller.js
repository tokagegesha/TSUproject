define([
    '../module',
    'angular'
], function (module, ng) {
    'use strict';

    return module.controller('guest_registerController', function ($scope, $state, $stateParams, userManager, formValidator) {
        $scope.errors = null;
        $scope.credentials = {birthDate: new Date()};
        // =========================
        $scope.dateOptions = {startingDay: 1, formatYear: 'yy'};
        $scope.birthDatePopup = {opened: false};
        $scope.openBirthDate = function () {
            $scope.birthDatePopup.opened = true;
        };
        // =========================
        $scope.register = function () {
            var credentials = ng.copy($scope.credentials);
            credentials.birthDate = new Date(credentials.birthDate).getTime();
            userManager.registerUser(credentials, function (err, res) {

            })
        }
    });
});