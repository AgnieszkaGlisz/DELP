import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

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

router.get('/set/:id', auth.authenticateToken, (req, res) =>{
    common.adminLog("Set with id = "+req.params.id+".")
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' + req.params.id
    db.query(sql,function(result:any){
        if(result == 0 || result[0].deleted == 1){
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

function insertIntoSetsExercises(setId:any,templateId:any,exerciseId:any){
    var sql='INSERT INTO `SetsExercises` (`idSet`, `idTemplate`, `idExercise`)'
    sql+='VALUES ('+setId+', '+templateId+', '+exerciseId+')'
    db.query(sql,function(result:any){
        if(result == 0){
            return
        }     
        common.adminLog("Insert into SetsExercises for setId:"+setId+" and exerciseId:"+exerciseId+".")                    
    })
}

router.post('/add-set', auth.authenticateToken, (req:any, res) => {
    var setName = req.body.setInfo.name
    var setInfo = req.body.setInfo.info
    var setCreatorId = req.user.id
    var date= new Date()
    var setCreationDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
    var setBaseLanId = req.body.setInfo.idBaseLanguage
    var setLearnLanId = req.body.setInfo.idLearnLanguage
    var setIsWordset = req.body.setInfo.isWordSet
    var setPopularity = 1
    var setIfVideo = null
    var setIfAudio = null
    var setIfPicture = null
    var exercises = req.body.exercises

    console.log(res);

    // checking data from client
    if(setName == undefined){
        res.status(401).json({error: "Data error."})
        return
    }
    if(setInfo == undefined){
        res.status(401).json({error: "Data error."})
        return
    }
    if(setBaseLanId == undefined){
        res.status(401).json({error: "Data error."})
        return
    }
    if(setLearnLanId == undefined){
        res.status(401).json({error: "Data error."})
        return
    }
    if(exercises == undefined){
        res.status(401).json({error: "Data error."})
        return
    }
    for(var i =0; i<exercises.length; i++){
        if(exercises[i].template == 'FillSentenceExerciseTemplate' && (exercises[i].leftPartOfSentence == undefined || exercises[i].wordToFill==undefined || exercises[i].rightPartOfSentence == undefined)){
            res.status(401).json({error: "Data error."})
            return
        }
        else if(exercises[i].template == 'TranslateSentenceExerciseTemplate' && (exercises[i].oryginalSentence== undefined || exercises[i].translatedSentence == undefined)){
            res.status(401).json({error: "Data error."})
            return
        }
        else if(exercises[i].template == 'WordExerciseTemplate' && ( exercises[i].word==undefined || exercises[i].translation == undefined)){
            res.status(401).json({error: "Data error."})
            return
        }
    }

    // Inserting data to database
    var sql = 'INSERT INTO `ExerciseSets` (`name`, `info`, `idCreator`, `setCreation`, `idBaseLanguage`, `idLearnLanguage`,`isWordSet`, `popularity`, `ifVideo`, `ifAudio`, `ifPicture`)'
    sql += 'VALUES ("'+setName+'", "'+setInfo+'", "'+setCreatorId+'","'+setCreationDate+'", '+setBaseLanId+', '+setLearnLanId+', '+setIsWordset+', '+setPopularity+', '+setIfVideo+', '+setIfAudio+', '+setIfPicture+')'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(401).json({error: "Insertion error."})
            return
        } 
        var setId = result.insertId
        common.adminLog("Insert into ExerciseSets.")
        for(var i = 0; i< exercises.length;i++){
            if(exercises[i].template == 'FillSentenceExerciseTemplate'){
                sql = 'INSERT INTO `FillSentenceExerciseTemplate` (`idSet`, `leftPartOfSentence`, `wordToFill`,`rightPartOfSentence`,`videoPath`, `audioPath`, `picturePath`) '
                sql +='VALUES ('+setId+', "'+exercises[i].leftPartOfSentence+'", "'+exercises[i].wordToFill+'","'+exercises[i].rightPartOfSentence+'", NULL, NULL, NULL)'
                db.query(sql,function(result:any){
                    if(result == 0){
                        return
                    } 
                    var exerciseId = result.insertId
                    common.adminLog("Insert into FillSentenceExerciseTemplate for setId:"+setId+" .")
                    insertIntoSetsExercises(setId,2,exerciseId)
                })
            }
            else if(exercises[i].template == 'TranslateSentenceExerciseTemplate'){
                sql = ' INSERT INTO `TranslateSentenceExerciseTemplate` (`idSet`, `oryginalSentence`, `translatedSentence`,`videoPath`, `audioPath`, `picturePath`) '
                sql +='VALUES ('+setId+', "'+exercises[i].oryginalSentence+'", "'+exercises[i].translatedSentence+'", NULL, NULL, NULL)'
                db.query(sql,function(result:any){
                    if(result == 0){
                        return
                    } 
                    var exerciseId = result.insertId
                    common.adminLog("Insert into FillSentenceExerciseTemplate for setId:"+setId+" .")
                    insertIntoSetsExercises(setId,3,exerciseId)
                })
            }
            else if(exercises[i].template == 'WordExerciseTemplate'){
                sql = 'INSERT INTO `WordExerciseTemplate` (`idSet`, `word`, `translation`, `videoPath`, `audioPath`, `picturePath`) '
                sql +='VALUES ('+setId+', "'+exercises[i].word+'", "'+exercises[i].translation+'", NULL, NULL, NULL)'
                db.query(sql,function(result:any){
                    if(result == 0){
                        return
                    } 
                    var exerciseId = result.insertId
                    common.adminLog("Insert into FillSentenceExerciseTemplate for setId:"+setId+" .")
                    insertIntoSetsExercises(setId,1,exerciseId)
                })
            }
        }
    })
})

router.get('/delete-set/:id', auth.authenticateToken, (req:any, res) =>{
    common.adminLog("Deleting set with id = "+req.params.id+".")
    var sql = 'SELECT * FROM ExerciseSets WHERE id=' + req.params.id
    db.query(sql,function(result:any){
        if(result == 0 || req.user.id != result[0].idCreator){
            res.status(404).json({error: "No result."})
            return
        } 
        sql = 'UPDATE ExerciseSets SET deleted = 1 WHERE id=' + req.params.id
        db.query(sql,function(result:any){
            if(result == 0){
                res.status(404).json({error: "No result."})
                return
            } 
            res.json({OK: "Set deleted."})
        })
    })
})


module.exports = router;