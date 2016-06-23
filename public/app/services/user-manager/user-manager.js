define([
    '../module',
    'angular'
], function (module, ng) {
    'use strict';

    return module.factory('userManager', function ($rootScope, requestHelper, sessionManager) {
        /**
         *
         * @type {Object}
         */
        var manager = {};

        manager.registerUser = function (credentials, cb) {
            requestHelper.processPOST('http://localhost:8081/api/student/add', credentials, function (err, res) {
                if (res) {
                    cb(null, res);
                    console.log(res);
                }
                console.log(err);
                cb(err, null);
            });
        };

        manager.login = function (credentials, cb) {
            requestHelper.processPOST('http://localhost:8081/api/student/login', credentials, function (err, res) {
                if (res) {
                    sessionManager.login(credentials, function (err, res) {
                        if (err) {
                           console.log('session login err >>>',err)
                        }
                        else{
                            console.log('session login res >>>',res)
                        }
                    });
                    console.log('user login res >>>',res);
                    cb(null, res);

                }
                console.log('user login err',err);
                cb(err, null);
            });
        };

        return manager;
    });
});