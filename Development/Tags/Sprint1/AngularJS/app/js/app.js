/**
 * Created by minhtran1 on 6/22/2016.
 */
define([
    'angular',
    'angular-route',
    'ui-bootstrap',
    'angular-animate',
    '../controllers/index',
    '../directives/index',
    '../filters/index',
    '../services/index',
    'ng-table',
    'config',
    'lang',
    'ng-resource',
    'underscore',
    'angular-cookies',
    'angular-jwt'
], function(ng) {
    'use strict';

    return ng.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'ngAnimate',
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'ngTable',
        'ngResource',
        'ngCookies',
        'angular-jwt'
    ]);
});