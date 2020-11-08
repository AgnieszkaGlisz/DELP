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

function createResponseTranslateSentence(result:any){
    
}
function createResponseFillSentence(result:any){
    
}
function incorrectWordsFillSentence(result:any){
    
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

router.get('/lesson/:id', auth.authenticateToken, (req, res) =>{
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' + req.params.id
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

module.exports = router;