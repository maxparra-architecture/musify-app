'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'key_secret_musify';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'Request without authorization header'});
    }

    //get the request token and eliminate the ""
    var token = req.headers.authorization.replace(/['"]+/g,'');
    console.log(token);

    try{
        var payload = jwt.decode(token,secret);
        console.log(payload);

        if(payload.exp <= moment.unix()){
            return res.status(401).send({message:'Expired token'});
        }

    }catch(ex){
        console.log(ex);
        return res.status(403).send({message:'Invalid token'});
    }

    req.user = payload;
    next();

};