define( [
    '../module'
], function( module ){
    'use strict';

    return module.factory( 'requestHelper', function( $http ){
        /**
         *
         * @type {Object}
         */
        var helper = {};

        /**
         * Success callback for HTTP request
         * @param {string} requestUrl
         * @param {Object} response
         * @param {Function} cb
         */
        var _successCallback = function( requestUrl, response, cb ){
            console.log( 'Request Helper, Response: <<<<<', requestUrl, '\r\n',
                response );
            if( cb && 'function' === typeof cb ){
                var responseData = response.data;
                if( responseData.errors ){
                    cb( responseData, null );
                }else if( responseData.data ){
                    cb( null, responseData );
                }else{
                    var cbErr = {
                        errors: [ {
                            code:    '000',
                            message: 'უცნობი შეცდომა.'
                        } ]
                    };
                    cb( cbErr, null );
                }
            }
        };

        /**
         * Error callback for HTTP request
         * @param {string} requestUrl
         * @param {Object} response
         * @param {Function} cb
         */
        var _errorCallback = function( requestUrl, response, cb ){
            console.log( 'Request Helper, Response: <<<<<', requestUrl, '\r\n',
                response );
            if( cb && 'function' === typeof cb ){
                var cbErr = {
                    errors: [ {
                        code:    response.status,
                        message: response.statusText
                    } ]
                };
                cb( cbErr, null );
            }
        };

        /**
         * GET Request
         * @param {string} requestUrl
         * @param {Function} cb
         * @returns {*}
         */
        helper.processGET = function( requestUrl, cb ){
            console.log( 'Request Helper, Request: >>>>>', requestUrl );
            return $http.get( requestUrl ).then( /**
             * Success
             * @param response
             */ function( response ){
                _successCallback( requestUrl, response, cb );
            }, /**
             * Error
             * @param response
             */ function( response ){
                _errorCallback( requestUrl, response, cb );
            } );
        };

        /**
         * POST Request
         * @param {string} requestUrl
         * @param {Object} requestData
         * @param {Function} cb
         * @returns {*}
         */
        helper.processPOST = function( requestUrl, requestData, cb ){
            console.log( 'Request Helper, Request: >>>>>', requestUrl, '\r\n',
                requestData );
            return $http.post( requestUrl, {
                data: requestData
            } ).then( /**
             * Success
             * @param response
             */ function( response ){
                _successCallback( requestUrl, response, cb );
            }, /**
             * Error
             * @param response
             */ function( response ){
                _errorCallback( requestUrl, response, cb );
            } );
        };

        return helper;
    } );
} );