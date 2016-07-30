/**
 * Created by minhtran1 on 6/22/2016.
 */
require.config({

    // alias libraries paths
    paths: {
        'domReady': '../lib/requirejs-domready/domReady',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'ui-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-animate': '../lib/angular-animate/angular-animate.min',
        'ng-table': '../lib/ng-table/dist/ng-table.min',
        'ng-resource': '../lib/angular-resource/angular-resource.min',
        'underscore': '../lib/underscore/underscore-min',
        'config': './config',
        'angular-cookies': '../lib/angular-cookies/angular-cookies.min',
        'angular-jwt': '../lib/angular-jwt/dist/angular-jwt.min'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'underscore': {
            exports: '_'
        },
        'angular': {
            exports: 'angular'
        },
        'ng-table': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular', 'angular-animate']
        },
        'ng-resource': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-jwt': {
            deps: ['angular']
        }
    },

    // kick start application
    deps: ['./bootstrap']
});