import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

router.use('/UserMedia/pictures', express.static('./UserMedia/pictures'))
router.use('/UserMedia/audio', express.static('./UserMedia/audio'))
router.use('/UserMedia/video', express.static('./UserMedia/video'))

const multer = require('multer')

const storage = multer.diskStorage({
    destination: './userMedia/pictures',
    filename: function(req:any,file:any,cb:any){
        cb(null,req.query.idSet + '_' + req.query.id + '_' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const videoStorage = multer.diskStorage({
    destination: './userMedia/video',
    filename: function(req:any,file:any,cb:any){
        cb(null,req.query.idSet + '_' + req.query.id + '_' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const audioStorage = multer.diskStorage({
    destination: './userMedia/audio',
    filename: function(req:any,file:any,cb:any){
        cb(null,req.query.idSet + '_' + req.query.id + '_' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({storage: storage})
const uploadVideo = multer({storage: videoStorage})
const uploadAudio = multer({storage: audioStorage})

router.post('/image', auth.authenticateToken, upload.single('image'), (req:any,res) => { // 
    console.log("in the image")
    common.adminLog(req.file)
    common.adminLog(req.query)
    if(req.file){
        updatePictureFileInfo(req.query.idSet, req.query.id, req.file.destination + '/' + req.file.filename);
        res.send({message: "ok"})
    }
    else {
        res.send({message: "Couldn't save the file, received undefined"})
    }
})

router.post('/video', auth.authenticateToken, uploadVideo.single('video'), (req:any,res) => { // 
    console.log("in the video")
    common.adminLog(req.file)
    common.adminLog(req.query)
    if(req.file){
        updateVideoFileInfo(req.query.idSet, req.query.id, req.file.destination + '/' + req.file.filename);
        res.send({message: "ok"})
    }
    else {
        res.send({message: "Couldn't save the file, received undefined"})
    }
})

router.post('/audio', auth.authenticateToken, uploadAudio.single('audio'), (req:any,res) => { // 
    console.log("in the audio")
    common.adminLog(req.file)
    common.adminLog(req.query)
    if(req.file){
        updateAudioFileInfo(req.query.idSet, req.query.id, req.file.destination + '/' + req.file.filename);
        res.send({message: "ok"})
    }
    else {
        res.send({message: "Couldn't save the file, received undefined"})
    }
})

function updateAudioFileInfo(idSet:number,exerciseOrder:number,path:string){
    var sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,SetsExercises.idTemplate,SetsExercises.exerciseOrder '
    sql += ' FROM SetsExercises '
    sql += ' WHERE  SetsExercises.idSet = ' + idSet
    db.query(sql, function(result:any){
        if(result == 0) 
            return
        for(var i = 0; i < result.length;i++){
            if( result[i].exerciseOrder == exerciseOrder){
                var template
                if(result[i].idTemplate == 1){
                    template = 'WordExerciseTemplate'
                }
                else if(result[i].idTemplate == 2){
                    template = 'FillSentenceExerciseTemplate'
                }
                else if(result[i].idTemplate == 3){
                    template = 'TranslateSentenceExerciseTemplate'
                }
                if(template != undefined){
                    sql = 'UPDATE `'+template+'`'
                    sql+= ' SET audioPath = "' + path + '"'
                    sql+= ' WHERE id=' + result[i].idExercise
                    db.query(sql, function(result:any){})

                    sql = 'UPDATE `ExerciseSets`' 
                    sql+= ' SET ifAudio = 1 '
                    sql+= ' WHERE id= ' + idSet
                    db.query(sql,function(result:any){})
                    }
                break
            }
        }
    })
}

function updateVideoFileInfo(idSet:number,exerciseOrder:number,path:string){
    var sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,SetsExercises.idTemplate,SetsExercises.exerciseOrder '
    sql += ' FROM SetsExercises '
    sql += ' WHERE  SetsExercises.idSet = ' + idSet
    db.query(sql, function(result:any){
        if(result == 0) 
            return
        for(var i = 0; i < result.length;i++){
            if( result[i].exerciseOrder == exerciseOrder){
                var template
                if(result[i].idTemplate == 1){
                    template = 'WordExerciseTemplate'
                }
                else if(result[i].idTemplate == 2){
                    template = 'FillSentenceExerciseTemplate'
                }
                else if(result[i].idTemplate == 3){
                    template = 'TranslateSentenceExerciseTemplate'
                }
                if(template != undefined){
                    sql = 'UPDATE `'+template+'`'
                    sql+= ' SET videoPath = "' + path + '"'
                    sql+= ' WHERE id=' + result[i].idExercise
                    db.query(sql, function(result:any){})

                    sql = 'UPDATE `ExerciseSets`' 
                    sql+= ' SET ifVideo = 1 '
                    sql+= ' WHERE id= ' + idSet
                    db.query(sql,function(result:any){})
                    }
                break
            }
        }
    })
}

function updatePictureFileInfo(idSet:number,exerciseOrder:number,path:string){
    var sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,SetsExercises.idTemplate,SetsExercises.exerciseOrder '
    sql += ' FROM SetsExercises '
    sql += ' WHERE  SetsExercises.idSet = ' + idSet
    db.query(sql, function(result:any){
        if(result == 0) 
            return
        for(var i = 0; i < result.length;i++){
            if( result[i].exerciseOrder == exerciseOrder){
                var template
                if(result[i].idTemplate == 1){
                    template = 'WordExerciseTemplate'
                }
                else if(result[i].idTemplate == 2){
                    template = 'FillSentenceExerciseTemplate'
                }
                else if(result[i].idTemplate == 3){
                    template = 'TranslateSentenceExerciseTemplate'
                }
                if(template != undefined){
                    sql = 'UPDATE `'+template+'`'
                    sql+= ' SET picturePath = "' + path + '"'
                    sql+= ' WHERE id=' + result[i].idExercise
                    db.query(sql, function(result:any){})

                    sql = 'UPDATE `ExerciseSets`' 
                    sql+= ' SET ifPicture = 1 '
                    sql+= ' WHERE id= ' + idSet
                    db.query(sql,function(result:any){})
                    }
                break
            }
        }
    })
}

module.exports = router;