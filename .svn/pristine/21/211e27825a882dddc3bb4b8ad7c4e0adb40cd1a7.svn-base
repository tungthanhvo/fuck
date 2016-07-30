// load a controller file 
var listcontrollers = require('../metadata/listcontrollers');
var jwtDecode = require('jwt-decode');
//this is used to parse the profile
function url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}
module.exports = {
    checkPermission: function(req, res, next) {

        // 3 parts: header, payload (important), decodeMethod
        var token = req.headers.authorization.split(' ')[1];
        console.log(token);
        //parse payload to get profile
        var account = jwtDecode(token);
        // console.log(decoded);
        // var profile = JSON.parse(url_base64_decode(encodedUser));
        // console.log(profile);

        var isRole = false;
        // dommy get role but the fact is not like that. It is got via a token
        var role = account.name_role;
        // dommy code. The fact is the url does not have query string after
        //if(req.method)



        var method = req.method.toLowerCase();
        if (method == "options") {
            method = req.headers['access-control-request-method'].toLowerCase();
        }
        var baseurl = method + req.originalUrl.split("?")[0];
        Object.keys(listcontrollers).forEach(function(tempRole) {
            if (tempRole === role) {
                listcontrollers[tempRole].forEach(function(controller) {
                    var regexp = new RegExp(controller);
                    if (regexp.test(baseurl)) {
                        isRole = true;
                        next();
                    }
                })
            }
        }, this);
        if (!isRole) {
            res.status(505).json({
                error: 'message'
            });
            res.end();
        }
    }
}