'use strict'

var path = require('path');
var fs = require('fs');

//import for pagination
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


function getAlbum(req,res){
    var albumId = req.params.id;

    //populate the artist date for replace id artist to data entire of artist
    Album.findById(albumId).populate({path: 'artist'}).exec((err,album)=>{
        if(err){
            res.status(500).send({message:'Request error'});
        }else{
            if(!album){
                res.status(404).send({message:'Album not found'});
            }else{
                res.status(200).send({album});
            }
            
        }
    });
}

function saveAlbum(req,res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err,albumStored)=>{
        if(err){
            res.status(500).send({message:'Request error'});
        }else{
            if(!albumStored){
                res.status(404).send({message:'Error album not stored'});
            }else{
                res.status(200).send({album:albumStored});
            }
        }
    });
}

function getAlbums(req,res){
    var artistId = req.params.artist;

    if(!artistId){
        //All albums
        var find = Album.find({}).sort('title');
    }else{
        //All Albums of an artist
        var find = Album.find({artist:artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err,albums)=>{
        if(err){
            res.status(500).send({message:'Error request'});
        }else{
            if(!albums){
                res.status(404).send({message:'Not found albums'});
            }else{
                res.status(200).send({albums});
            }
        }
    });


}

function updateAlbum(req,res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId,update,(err,albumUpdated)=>{
        if(err){
            res.status(500).send({message:'Error request'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message:'Not found album'});
            }else{
                res.status(200).send({album:albumUpdated});
            }
        }
    });
}

function deleteAlbum(req,res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId,(err,albumRemoved)=>{
        if(err){
            res.status(500).send({message:'Request Error'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message:'Album not found'});
            }else{
                Song.find({artist: albumRemoved._id}).remove((err,songRemoved)=>{
                    if(err){
                        res.status(500).send({message:'Request Error'});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message:'Song not found'});
                        }else{
                            res.status(200).send({album:albumRemoved});
                        }
                    }
                   });

            }
        }
       });

}

function uploadImage(req,res){
    var albumId = req.params.id;
    var file_name = 'No uploaded';

    if(req.files){
        
        //Extract file name and file extension
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        console.log(file_path);

        //validate image extension
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Album.findByIdAndUpdate(albumId,{image: file_name},(err,albumUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error updating album'});
                }else{
                    if(!albumUpdated){
                        res.status(404).send({message:'Error: Unable to update album'});
                    }else{
                        res.status(200).send({album: albumUpdated});
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
    var pathFile = './uploads/albums/'+imageFile;

    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message:'Error: Image no found'});
        }
    });
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};
