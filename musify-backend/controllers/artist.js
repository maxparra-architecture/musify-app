'use strict'

var path = require('path');
var fs = require('fs');

//import for pagination
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


function getArtist(req,res){

    var artistId = req.params.id;

    Artist.findById(artistId,(err,artist) => {
        if(err){
            res.status(500).send({message:'Request error'});
        }else{
            if(!artist){
                res.status(404).send({message: 'Artist not found'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

function getArtists(req,res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var page = req.params.page;
    var itemsPerPage = 4;

    Artist.find().sort('name').paginate(page,itemsPerPage,function(err,artists,total){
        if(err){
            res.status(500).send({message:'Request error'});
        }else{
            if(!artists){
                res.status(404).send({message: 'Not found artists'});
            }else{
                res.status(200).send({
                    totalArtists: total,
                    artists: artists
                });
            }
        }
    });

}

function saveArtist(req,res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err,artistStored)=>{
        if(err){
            res.status(500).send({message: 'Error during save artist'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'Error: artist not save'});
            }else{
                res.status(200).send({artist:artistStored});
            }
        }
    });
}

function updateArtist(req,res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err,artistUpdate) =>{
        if(err){
            res.status(500).send({message:'Request Error'});
        }else{
            if(!artistUpdate){
                res.status(404).send({message:'Artist not found'});
            }else{
                res.status(200).send({artist:artistUpdate});
            }
        }
    });
}

function deleteArtist(req,res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err,artistRemoved)=>{
        if(err){
            res.status(500).send({message:'Request Error'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message:'Artist not found'});
            }else{
               //Delete in cascade Album and Songs links with the artist removed
               Album.find({artist: artistRemoved._id}).remove((err,albumRemoved)=>{
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
                                    res.status(200).send({artist:artistRemoved});
                                }
                            }
                           });

                    }
                }
               });
                

            }
        }
    });
}

function uploadImage(req,res){
    var artistId = req.params.id;
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
            Artist.findByIdAndUpdate(artistId,{image: file_name},(err,artistUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error updating artist'});
                }else{
                    if(!artistUpdated){
                        res.status(404).send({message:'Error: Unable to update artist'});
                    }else{
                        res.status(200).send({artist: artistUpdated});
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
    var pathFile = './uploads/artists/'+imageFile;

    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message:'Error: Image no found'});
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};