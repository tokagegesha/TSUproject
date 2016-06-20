define([
    '../module',
    'angular'
], function (module, ng) {
    'use strict';

    return module.factory('userManager', function ($rootScope, requestHelper) {
        /**
         *
         * @type {Object}
         */
        var manager = {};

        manager.registerUser = function (credentials, cb) {
            requestHelper.processPOST('http://localhost:8081/api/user/add', credentials, function (err, res) {
                if (res) {
                    cb(null,res);
                    console.log(res);
                }
                console.log(err);
                cb(err, null);
            });
        };

        return manager;
    });
});