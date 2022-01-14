'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'key_secret_musify';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //date created
        exp: moment().add(30,'days').unix() //date expiration
    };

    return jwt.encode(payload, secret);
};