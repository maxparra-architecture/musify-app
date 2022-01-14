//Para usar lo ultimo de javascript
'use strict'

var mongoose = require('mongoose');
var app = require('./app');

//Set port to web server
var port = process.env.PORT || 3977;

//Database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/musifydb',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("Database connection established");
        app.listen(port,function(){
            console.log("Musify web server is running on http://localhost:"+port);
        });
    }
});

