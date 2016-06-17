/**
 * Bootstraps angular onto the window.document node
 */
define([
    'angular',
    './app',
    './states'
], function (ng) {
    'use strict';

    return ng.bootstrap(document, ['app']);
});
