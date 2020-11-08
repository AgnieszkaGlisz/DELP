import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

function createResponseWord(id:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM WordExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        var word = {
            word: result.word,
            translation: result.translation,
        }
        exercises.push(word)
        sendSet(exercises,length,res)
        return 1
    })    
}

function createResponseTranslateSentence(id:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM TranslateSentenceExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        var translateSentence = {
            oryginalSentence:result[0].oryginalSentence,
            translatedSentence: result[0].translatedSentence
        }
        exercises.push(translateSentence)
        sendSet(exercises,length,res)
        return 1
    })    
}
function createResponseFillSentence(id:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM FillSentenceExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        var fillSentence = {
            leftPartOfSentence:result[0].leftPartOfSentence,
            wordToFill:result[0].wordToFill,
            rightPartOfSentence: result[0].rightPartOfSentence,
            incorrectWords: {}
        }
        exercises.push(fillSentence)
        sendSet(exercises,length,res)
        return 1
    })    
}
function incorrectWordsFillSentence(result:any){
    
}

function createResponseSet(db_result:any){
    var setTemp = {
        id: db_result[0].id,
        name: db_result[0].name,
        info: db_result[0].info,
        idCreator: db_result[0].idCreator,
        setCreation: db_result[0].setCreation,
        idBaseLanguage: db_result[0].idBaseLanguage,
        idLearnLanguage: db_result[0].idLearnLanguage,
        isWordSet: db_result[0].isWordSet,
        popularity: db_result[0].popularity,
        ifVideo: db_result[0].ifVideo,
        ifAudio: db_result[0].ifAudio,
        ifPicture: db_result[0].ifPicture
    }
    return setTemp;
}

function sendSet(exercises:any,length:any,res:any){
    if(exercises.length == length){
        res.json(exercises)
    }
}

router.get('/lesson/:id', auth.authenticateToken, (req, res) =>{
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' + req.params.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        var set = createResponseSet(result);
        if(set.isWordSet == null || set.isWordSet == false){
            sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,TemplatesInfo.name FROM SetsExercises, TemplatesInfo WHERE TemplatesInfo.id = SetsExercises.idTemplate AND SetsExercises.idSet = ' + req.params.id
            db.query(sql, function(templates:any){
                if(templates == 0){
                    res.status(404).json({error: "No result."})
                    return
                } 
                common.adminLog(templates)
                var exercises = [{}]
                exercises.pop()
                var length = templates.length
                var iRes = 0;
                for(var i =0;i<length;i++){
                    common.adminLog('i: '+i)
                    if(templates[i].name == 'FillSentenceExerciseTemplate')
                        iRes = createResponseFillSentence(templates[i].idExercise,exercises,length,res)
                    else if(templates[i].name == 'TranslateSentenceExerciseTemplate')
                        iRes = createResponseTranslateSentence(templates[i].idExercise,exercises,length,res)
                    else if(templates[i].name == 'WordExerciseTemplate')
                        iRes = createResponseFillSentence(templates[i].idExercise,exercises,length,res)
                    if( iRes == 1){
                        iRes = 0
                        length--
                    }
                }
                return
            })
        }
        //res.status(404).json({error: "No result."})
    })
})

module.exports = router;