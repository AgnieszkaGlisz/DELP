import express = require('express')
const app = express()

const router = express.Router();
const db = require('../app')

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

app.get('/wordset', (req, res) =>{
    var sql = 'SELECT * FROM WordExerciseTemplate'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response. - wordset')
            var wordTemp ={
                id: result[0].id,
                idSet: result[0].idSet,
                word: result[0].word,
                translation: result[0].translation,
                videoPath: result[0].videoPath,
                audioPath: result[0].audioPath,
                picturePath: result[0].picturePath}
            res.json(wordTemp)
        }
        res.send(JSON.stringify(wordTemp))
        console.log("data send" + wordTemp)
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