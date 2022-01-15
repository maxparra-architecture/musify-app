'use strict'

//import model User
var User = require('../models/user');

//import bcrypt for encrypt password
var bcrypt = require('bcrypt-nodejs');
const { param, use } = require('../routes/user');

//import service for JWT
var jwt = require ('../services/jwt');

//imports for work with file system and paths
var fs = require('fs');
var path = require('path');

function test(req,res){
    res.status(200).send({
        message:'Test user controller'
    });
}

function saveUser(req, res){
    var user = new User();
    
    var params = req.body;

    //print input params
    console.log(params);

    //Mapping params from POST method
    user.name       = params.name;
    user.surname    = params.surname;
    user.email      = params.email;
    user.role       = 'ROLE_ADMIN';
    user.image      = 'null';

   
    if(params.password){
         //encrypt password
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            
            //validate name and surname and email not null
            if(user.name != null && user.surname != null && user.email != null){
                //save user
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: 'Error during save the user'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'Error: user not registered'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: 'Input all the fields'});
            }
        });

    }else{
        res.status(200).send({message: 'Input the password'});
    }
}

function loginUser(req,res){

    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email:email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!user){
                res.status(404).send({message: 'Error: user doesnt exist'});
            }else{
                //validate password
                bcrypt.compare(password,user.password, function(err, check){
                    if(check){
                        //gethash is a flag for get token jwt
                        if(params.gethash){
                            //get token JWT
                            res.status(200).send({token: jwt.createToken(user)});
                        }else{
                            res.status(200).send({user: user});
                        }
                    }else{
                        res.status(403).send({message: 'Error: invalid password'});
                    }
                });
            }
        }
    });
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error updating user'});
        }else{
            if(!userUpdated){
                res.status(404).send({message:'Error: Unable to update user'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    var userId = req.params.id;
    var file_name = 'No uploaded';

    if(req.files){
        console.log(req.files.image);

        //Extract file name and file extension
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //validate image extension
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId,{image: file_name},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error updating user'});
                }else{
                    if(!userUpdated){
                        res.status(404).send({message:'Error: Unable to update user'});
                    }else{
                        res.status(200).send({image: file_name, user: userUpdated});
                    }
                }
            });

        }else{
            res.status(200).send({message: 'Error: invalid format image'});
        }

    }else{
        res.status(200).send({message: 'Error: no image load'});
    }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/'+imageFile;

    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message:'Error: Image no found'});
        }
    });
}



module.exports = {
    test,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};