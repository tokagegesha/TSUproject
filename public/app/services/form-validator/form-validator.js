define([
    '../module'
], function (module) {
    'use strict';

    return module.factory('formValidator', function () {
        /**
         *
         * @type {Object}
         */
        var validator = {};

        /**
         *
         * @param {Object} form
         * @param {Object} messages
         * @returns {Array|null}
         */
        validator.validate = function (form, messages) {
            var errors = [];
            for (var i in messages) {
                if (messages.hasOwnProperty(i) && form.$error[i]) {
                    form.$error[i].forEach(function (value) {
                        var message = messages[i][value.$name];
                        if (message) {
                            errors.push({message: message});
                        }
                    });
                }
            }
            return errors.length ? errors : null;
        };

        return validator;
    });
});