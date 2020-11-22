import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")



function createResponseWord(result:any){
    var wordTemp = [];
        for (var i = 0; i < result.length ; i++) { 
            wordTemp.push({
                id: result[i].id,
                idSet: result[i].idSet,
                word: result[i].word,
                translation: result[i].translation,
                videoPath: result[i].videoPath,
                audioPath: result[i].audioPath,
                picturePath: result[i].picturePath})
        }
    return wordTemp;
}

function createResponseSet(result:any){
    var setTemp = {
        id: result[0].id,
        name: result[0].name,
        info: result[0].info,
        idCreator: result[0].idCreator,
        setCreation: result[0].setCreation,
        idBaseLanguage: result[0].idBaseLanguage,
        idLearnLanguage: result[0].idLearnLanguage,
        idWordSet: result[0].idWordSet,
        popularity: result[0].popularity,
        ifVideo: result[0].ifVideo,
        ifAudio: result[0].ifAudio,
        ifPicture: result[0].ifPicture
    }
    return setTemp;
}

router.get('/wordset/:id', auth.authenticateToken, (req, res) =>{
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' +req.params.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        var wordTemp = createResponseWord(result);
        var sql = 'SELECT * FROM WordExerciseTemplate WHERE idSet=' + req.params.id;
        db.query(sql, function(result1:any){
            if(result1 == 0){
                res.status(404).json({error: "No result."})
                return
            } 
            var setTemp = createResponseSet(result1);
            var finalResponse = {
                setInfo: setTemp,
                exercises: wordTemp  
            }
            res.send(finalResponse);
        })
    })
})

router.get('/save-wordset', (req,res) => {
    var sql = 'INSERT INTO WordExerciseTemplate (id, idSet, word, translation, videoPath, audioPath, picturePath) VALUES(122,122, "krowa", "cow", "p", "p", "p");'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            res.send("sent")
        }
        
    })

})

router.get('/delete', (req,res) => {
    var sql = 'DELETE FROM WordExerciseTemplate WHERE id=122;'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            res.send("deleted")
        }
        
    })
})

router.get('/words', (req, res) =>{
    var sql = 'SELECT * FROM WordExerciseTemplate'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response. - wordset')
            var wordTemp = createResponseWord(result);
            //res.json(wordTemp)
            console.log(JSON.stringify(wordTemp))
            res.contentType('application/json')
            res.send(JSON.stringify(wordTemp))
            
        }
    })
    
})

router.get('/word', (req,res) => {
    var sql = 'SELECT * FROM WordExerciseTemplate WHERE id=' + req.headers.id;
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Getting a word')
            var wordTemp = createResponseWord(result);
            console.log(JSON.stringify(wordTemp))
            res.contentType('application/json')
            res.send(JSON.stringify(wordTemp))
            console.log(req)
        }
    })
    
})

router.get('/words-in-set', (req, res) =>{
    var sql = 'SELECT * FROM WordExerciseTemplate WHERE idSet=' + req.headers.id;
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response. - wordset')
            var wordTemp = createResponseWord(result);
            //console.log(typeof(result))
            res.contentType('application/json')
            res.send(JSON.stringify(wordTemp))
        }
    })
    
})

router.get('/exerciseSets', (req, res) =>{
    var sql = 'SELECT * FROM ExerciseSets'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response. - exercise sets')
            var sets = [];
            for (var i = 0; i < result.length ; i++) { 
                sets.push({
                    id: result[i].id,
                    name: result[i].name,
                    info: result[i].info,
                    idCreator: result[i].idCreator,
                    setCreation: result[i].setCreation,
                    idBaseLanguage: result[i].idBaseLanguage,
                    idLearnLanguage: result[i].idLearnLanguage,
                    idWordSet: result[i].idWordSet,
                    popularity: result[i].popularity,
                    ifVideo: result[i].ifVideo,
                    ifAudio: result[i].ifAudio,
                    ifPicture: result[i].ifPicture
                })
            }
            //res.json(wordTemp)
            console.log(JSON.stringify(sets))
            res.contentType('application/json')
            res.send(JSON.stringify(sets))
            
        }
    })
})


module.exports = router;