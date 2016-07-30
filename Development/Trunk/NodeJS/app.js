var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = express.Router();
var cors = require('cors');
var favicon = require('serve-favicon');

var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var jwtDecode = require('jwt-decode');

var secret = 'this is the secret secret secret 12356';

// load router
var meta_data_router = require('./routes/meta_data');
var employees_router = require('./routes/employees');
var employee_create_router = require('./routes/employee_create');
var accounts_router = require('./routes/accounts');
var employee_search = require('./routes/employee_search');
var project_search = require('./routes/project_search');
var commonRouter = require('./routes/common_data');
var userRouter = require('./routes/user');
var assignment_router = require('./routes/assignments');
var employee_update = require('./routes/employee_update');
var cv_router = require('./routes/export_cv');
var projects_router = require('./routes/projects');
//load middleware
var permissions = require('./middlewares/permissions');

// set up app 
var app = express();
var newexpires = new Date();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());

// We are going to protect /api routes with JWT
app.use('/apis', expressJwt({
    secret: secret
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));


// allow cross domain
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,newExpires,isexpired");
    var newexpires = new Date();

    // // 3 parts: header, payload (important), decodeMethod
    if (req.headers.authorization) {

        res.setHeader('Access-Control-Expose-Headers', 'newexpires, newtoken,isexpired,Etag');
        var token = req.headers.authorization.split(' ')[1];
        var account = jwtDecode(token);
        var newexpires = new Date();

        // We are sending the user inside the token

        if (account.expires < newexpires.getTime()) {
            res.setHeader("isexpired", "yes");
        } else {
            res.setHeader("isexpired", "no");
            var mins = 30;
            if (account.remember === true)
                mins = 60;
            res.setHeader("newexpires", newexpires.getTime() + mins * 60000);
            account.expires = newexpires.getTime() + mins * 60000;
            var newtoken = jwt.sign(account, secret, {
                expiresIn: newexpires.getTime() + mins * 60000,
            });
            res.setHeader("newtoken", newtoken);
        }
    }
    next();
});

// for login function
app.use(function (err, req, res, next) {
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
app.use('/project_search', project_search);
app.use('/api/employee_update', employee_update);
//app.user('/api/employee_update',employee_update);
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

app.use('/api/search_employee', employee_search);
app.use('/api/search_project', project_search);
app.use('/apii/projects', projects_router);
app.use('/apii/assignments', assignment_router);

app.use('/cv', cv_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;