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
        'angular-jwt': '../lib/angular-jwt/dist/angular-jwt.min',
        'ngSmoothScroll': '../lib/ngSmoothScroll/lib/angular-smooth-scroll',
        'angular-ui-select2': '../lib/angular-ui-select2/src/select2',
        'angular-filter': '../lib/angular-filter/dist/angular-filter.min',
        'angular-tpls-toastr': '../lib/angular-toastr/dist/angular-toastr.tpls',
        'ng-file-upload': '../lib/ng-file-upload/ng-file-upload.min'
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
        },
        'ngSmoothScroll': {
            deps: ['angular']
        },
        'angular-ui-select2': {
            deps: ['angular']
        },
        'angular-filter': {
            deps: ['angular']
        },
        'angular-tpls-toastr': {
            deps: ['angular']
        },
        'ng-file-upload': {
            deps: ['angular']
        }
    },

    // kick start application
    deps: ['./bootstrap']
});

$(document).ready(function() {
    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

});