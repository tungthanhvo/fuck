/**
 * Created by minhtran1 on 6/22/2016.
 */
/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'angular',
    'app',
    'routes'
], function (require, ng, app) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});