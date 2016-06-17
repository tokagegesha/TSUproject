define( [
    '../module',
    'angular'
], function( module, ng ){
    'use strict';

    return module.controller( 'guest_loginController', function( $scope,
                                                                 $state,
                                                                 $stateParams,
                                                                 sessionManager,
                                                                 formValidator ){
        $scope.errors = null;
        $scope.credentials = {};

        $scope.login = function(){
            $scope.errors = formValidator.validate( $scope.loginForm, {
                required: {
                    'username': 'გთხოვთ შეიყვანეთ მომხმარებლის სახელი.',
                    'password': 'გთხოვთ შეიყვანეთ პაროლი.'
                }
            } );

            if( !$scope.errors ){
                var credentials = ng.copy( $scope.credentials );
                sessionManager.login( credentials, function( err, res ){
                    if( err ){
                        $scope.errors = err.errors;
                    }else if( res ){
                        //noinspection JSUnresolvedVariable
                        var redirectUrl = $stateParams.redirectUrl;
                        if( redirectUrl ){
                            window.location.replace( decodeURIComponent( redirectUrl ) );
                        }else{
                            $state.go( 'member.home' );
                        }
                    }
                } );
            }
        };
    } );
} );