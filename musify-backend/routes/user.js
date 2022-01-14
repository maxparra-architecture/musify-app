'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

//import middleware for authentication
var md_auth = require('../middlewares/authenticated');

//import multipart for upload images
var multipart = require('connect-multiparty');
//This middleware upload files into the folder uploads/users
var md_upload = multipart({ uploadDir: './uploads/users'});

//api.get('/test-controller',UserController.test);
api.get('/test-controller',md_auth.ensureAuth, UserController.test);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;