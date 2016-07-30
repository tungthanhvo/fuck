//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './app',

        files: [
            'lib/requirejs/require.js',
            'js/main.js',
            'js/app.js',
            'services/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};