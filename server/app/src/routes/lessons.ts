import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")
/*
function createResponseWord(id:any,exercises:any,length:any,elemInExercArray:any,res:any):any{
    var sql = 'SELECT * FROM WordExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        var word = {
            order:elemInExercArray,
            template:'word',
            word: result.word,
            translation: result.translation
        }
        exercises.push(word)
        sendSet(exercises,length,res)
        return 1
    })    
}

function createResponseTranslateSentence(id:any,exercises:any,length:any,elemInExercArray:any,res:any):any{
    var sql = 'SELECT * FROM TranslateSentenceExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        var translateSentence = {
            order:elemInExercArray,
            template:'translateSentence',
            oryginalSentence:result[0].oryginalSentence,
            translatedSentence: result[0].translatedSentence
        }
        exercises.push(translateSentence)
        sendSet(exercises,length,res)
        return 1
    })    
}
function createResponseFillSentence(id:any,exercises:any,length:any,elemInExercArray:any,res:any):any{
    var sql = 'SELECT * FROM FillSentenceExerciseTemplate WHERE id = ' + id
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        
        var fillSentence = {
            order:elemInExercArray,
            template:'fillSentence',
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

function createResponseWords(allId:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM WordExerciseTemplate WHERE id IN ' + JSON.stringify(allId).replace('[','(').replace(']',')')
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        for (var i = 0; i < result.length ; i++) { 
            exercises.push({
                id:result[i].id,
                template:'WordExerciseTemplate',
                word: result[i].word,
                translation: result[i].translation})
        }
        sendSet(exercises,length,res)
        return 1
    })    
}

function createResponseTranslateSentences(allId:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM TranslateSentenceExerciseTemplate WHERE id IN ' + JSON.stringify(allId).replace('[','(').replace(']',')')
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        for (var i = 0; i < result.length ; i++) { 
            exercises.push({
                id:result[i].id,
                template:'TranslateSentenceExerciseTemplate',
                oryginalSentence:result[0].oryginalSentence,
                translatedSentence: result[0].translatedSentence
            })
        }
        sendSet(exercises,length,res)
        return 1
    })    
}
function createResponseFillSentences(allId:any,exercises:any,length:any,res:any):any{
    var sql = 'SELECT * FROM FillSentenceExerciseTemplate WHERE id IN ' + JSON.stringify(allId).replace('[','(').replace(']',')')
    db.query(sql,function(result:any){
        if(result == 0){
            return 0
        } 
        for (var i = 0; i < result.length ; i++) { 
            exercises.push({
                id:result[i].id,
                template:'FillSentenceExerciseTemplate',
                leftPartOfSentence:result[0].leftPartOfSentence,
                wordToFill:result[0].wordToFill,
                rightPartOfSentence: result[0].rightPartOfSentence,
                incorrectWords: {}
            })
        }
        sendSet(exercises,length,res)
        return 1
    })    
}
*/
function sortExercises(exercises:any,templates:any){
    common.adminLog('Sorting exercises.')
    var tmpExercises = []
    for(var i =0 ; i< templates.length; i++){
        for(var j =0 ; j< exercises.length; j++){
            if(templates[i].name == exercises[j].template && templates[i].idExercise == exercises[j].id) { 
                tmpExercises.push(exercises[j])
                continue
            }
        }
    }
    for(var i =0 ; i< templates.length; i++){
        exercises[i] = tmpExercises[i]
    }
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

router.get('/lesson/:id', auth.authenticateToken, (req, res) =>{
    common.adminLog("Lesson with id = "+req.params.id+".")
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' + req.params.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        common.adminLog('Preparing and sending lesson and all exercises.')
        var set = createResponseSet(result);
        sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,TemplatesInfo.name FROM SetsExercises, TemplatesInfo WHERE TemplatesInfo.id = SetsExercises.idTemplate AND SetsExercises.idSet = ' + req.params.id
        db.query(sql, function(templates:any){
            if(templates == 0){
                res.status(404).json({error: "No result."})
                return
            } 
            var wordTemplates = []
            var fillSentenceTemplates = []
            var translateSetnenceTemplates = []
            for(var i =0;i<templates.length;i++){
                if(templates[i].name == 'FillSentenceExerciseTemplate')
                    fillSentenceTemplates.push(templates[i].idExercise)
                else if(templates[i].name == 'TranslateSentenceExerciseTemplate')
                    translateSetnenceTemplates.push(templates[i].idExercise)
                else if(templates[i].name == 'WordExerciseTemplate')
                    wordTemplates.push(templates[i].idExercise)
            }
            var exercises = [{}]
            exercises.pop()
            if(fillSentenceTemplates.length != 0){
                common.adminLog('Preparing FillSentenceExerciseTemplate Exercises.')
                var ids = JSON.stringify(fillSentenceTemplates).replace('[','(').replace(']',')')
                sql = 'SELECT * FROM FillSentenceExerciseTemplate WHERE id IN ' + ids
                db.query(sql,function(result:any){
                    if(result == 0)
                        return 
                    for (var i = 0; i < result.length ; i++) 
                        exercises.push({
                            id:result[i].id,
                            template:'FillSentenceExerciseTemplate',
                            leftPartOfSentence:result[i].leftPartOfSentence,
                            wordToFill:result[i].wordToFill,
                            rightPartOfSentence: result[i].rightPartOfSentence,
                            incorrectWords: {}})
                    if(exercises.length == templates.length){
                        sortExercises(exercises,templates)
                        var lessonRes = {
                            setInfo: set,
                            exercises: exercises
                        }
                        res.json(lessonRes)
                    }
                })    
            }
            if(translateSetnenceTemplates.length != 0){
                common.adminLog('Preparing TranslateSentenceExerciseTemplate Exercises.')
                var ids = JSON.stringify(translateSetnenceTemplates).replace('[','(').replace(']',')')
                sql = 'SELECT * FROM TranslateSentenceExerciseTemplate WHERE id IN ' + ids
                db.query(sql,function(result:any){
                    if(result == 0)
                        return 
                    for (var i = 0; i < result.length ; i++) 
                        exercises.push({
                            id:result[i].id,
                            template:'TranslateSentenceExerciseTemplate',
                            oryginalSentence:result[i].oryginalSentence,
                            translatedSentence: result[i].translatedSentence})
                    if(exercises.length == templates.length){
                        sortExercises(exercises,templates)
                        var lessonRes = {
                            setInfo: set,
                            exercises: exercises
                        }
                        res.json(lessonRes)
                    }
                })   
            }
            if(wordTemplates.length != 0){
                common.adminLog('Preparing WordExerciseTemplate Exercises.')
                var ids = JSON.stringify(wordTemplates).replace('[','(').replace(']',')')
                sql = 'SELECT * FROM WordExerciseTemplate WHERE id IN ' + ids
                db.query(sql,function(result:any){
                    if(result == 0)
                        return 
                    for (var i = 0; i < result.length ; i++)
                        exercises.push({
                            id:result[i].id,
                            template:'WordExerciseTemplate',
                            word: result[i].word,
                            translation: result[i].translation})
                    if(exercises.length == templates.length){
                        sortExercises(exercises,templates)
                        var lessonRes = {
                            setInfo: set,
                            exercises: exercises
                        }
                        res.json(lessonRes)
                    }
                })    
            }
        })
    })
})

module.exports = router;