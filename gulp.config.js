/*jshint node:true */

module.exports = function() {

    var src = './src/';
    var app = src + 'base/';
    var email = app +'_email/';

    var config = {
        // Reserved and written to in gulpfile.js
        env: '',
        settings: '',
        themes: [],
        /************** Paths ****************/
        build: 'dist/',
        src: src,
        // App
        fonts: app + '_fonts/**/*.{otf,svg,eot,ttf,woff,woff2}',
        html: {
            root: app + '*.html',
            nonRoot: [
                app + '**/*.html',
                '!' + email + '**/*',
                '!' + app + '*.html',
            ],
        },
        media: [
            // Ignore media, declaring the _images folder directly moves all of its contents
            // without the container folder getting in the way
            app + '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            app + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            '!' + app + '_fonts/*',
        ],
        misc: [
            app + '*.{htaccess,ico,xml}',
            app + 'humans.txt'
        ],
        robots: {
            default: app + 'robots.dev.txt',
            prod: app + 'robots.prod.txt',
        },
        styles: {
            root: app + 'app.scss',
            all: [
                app + '**/*.scss',
                app + '**/*.css',
            ],
        },
        scripts: {
            app: [
                src + 'config.js', // this is a built file
                app + '**/init.js',
                app + '**/*.js',
                '!' + app + '_lib/**/*', // don't clobber lib
            ],
            lib: [
                app + '_lib/jquery.min.js',
                app + '_lib/angular.min.js',
                app + '_lib/**/*.min.js',
            ],
        },

        // Emails
        email: {
            root: email,
            html: [
                // ignore built files
                email + '*.html',
                '!' + email + '*.inline.html'
            ],
            style: email + 'css.css'
        },

        /************** Settings ****************/
        node: {
            port: '8080',
            lrPort: '35729', // not used?
        },
        sassSettings: {
            // Seems to break sourcemaps, so conditionally minify css in gulpfile
            // outputStyle: 'compressed',
            precision: 8,
        },
        uglifySettings: {
            mangle: false,
        },
    };

    return config;
};

