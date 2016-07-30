var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = express.Router();
var cors = require('cors');

var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var secret = 'this is the secret secret secret 12356';

// load router
var meta_data_router = require('./routes/meta_data');
var employees_router = require('./routes/employees');
var employee_create_router = require('./routes/employee_create');
var accounts_router = require('./routes/accounts');
var employee_search = require('./routes/employee_search.js');
var commonRouter = require('./routes/common_data');
var userRouter = require('./routes/user');


//load middleware
var permissions = require('./middlewares/permissions');

// set up app 
var app = express();



app.use(cors());

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({
    secret: secret
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

// allow cross domain
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
    next();
});

// for login function
app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/metadata', meta_data_router);
//using router
app.use('/account', accounts_router);


app.use('/api/misc', employee_create_router);

app.use('/api/data', commonRouter);
app.use('/api/users', userRouter);


/**
 * need to invoke permissions middleware
 * employees router
 */
app.use('/api/employees', permissions.checkPermission, employees_router);

// var admin_router = require('./routes/admin');
// app.use('/api/admin', permissions.checkPermission, admin_router);

app.use('/api/search', employee_search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// app.listen(8080, function() {
//     console.log('Listening on port 8080!');
// });

module.exports = app;