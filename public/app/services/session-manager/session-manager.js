define([
    '../module',
    'angular'
], function (module, ng) {
    'use strict';

    return module.factory('sessionManager', function ($rootScope, requestHelper) {
        /**
         *
         * @type {Object}
         */
        var manager = {};

        /**
         *
         * @type {null|Object}
         */
        var sessionData = null;

        /**
         * Sets session data
         * @param {null|Object} value
         * @private
         */
        var _setData = function (value) {
            if (false === ng.equals(sessionData, value)) {
                sessionData = value;
                $rootScope.$broadcast('sessionDataChanged', sessionData);
            }
        };

        /**
         * Gets session data
         * @returns {null|Object}
         */
        manager.getData = function () {
            return sessionData;
        };

        /**
         * Gets value from session
         * @param {string} key
         * @returns {*}
         */
        manager.getValue = function (key) {
            return manager.isSessionAlive() ? sessionData[key] : null;
        };

        /**
         * Checks if session is alive
         * @returns {boolean}
         */
        manager.isSessionAlive = function () {
            return null !== sessionData;
        };

        /**
         * Opens session
         * @param {Object} credentials
         * @param {Function} cb
         */
        manager.login = function (credentials, cb) {
            requestHelper.processPOST('http://localhost:8081/api/session/get', credentials, function (err, res) {
                if (res) {
                    console.log(' session response >>>>>>'+res);
                    _setData(res.data);
                    //if( res.data && res.data.length )
                    //  _setData( res.data[ 0 ] );
                }
                cb(err, res);
            });
        };

        var _retrieveSessionCallbacks = [],
            _retrieveSessionProcessing = false;

        /**
         * Retrieves session data
         * @param {Function} cb
         */
        manager.retrieveSession = function (cb) {
            _retrieveSessionCallbacks.push(cb);

            if (_retrieveSessionProcessing) {
                return;
            }
            _retrieveSessionProcessing = true;

            requestHelper.processPOST('/api/commons/auth/retrieveSession', {
                //
            }, function (err, res) {
                if (res) {
                    _setData(res.data);
                }

                // Call callbacks
                _retrieveSessionCallbacks.forEach(function (cb) {
                    cb(err, res);
                });

                // Clear callbacks array
                _retrieveSessionCallbacks = [];
                // Set processing to false
                _retrieveSessionProcessing = false;
            });
        };

        /**
         * Closes session
         * @param {Function} cb
         */
        manager.logout = function (cb) {
            requestHelper.processPOST('/api/commons/auth/logout', {
                //
            }, function (err, res) {
                if (res) {
                    _setData(null);
                }
                cb(err, res);
            });
        };

        return manager;
    });
});