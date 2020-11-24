import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")


function sortExercises(exercises:any,templates:any){
    common.adminLog('Sorting exercises.')
    var tmpExercises = new Array(templates.length);
    for(var i =0 ; i< templates.length; i++){
        if(templates[i].exerciseOrder == null){
            common.adminLog("Random exercise order.")
            return
        }
    }
    for(var i =0 ; i < templates.length; i++){
        for(var j =0 ; j< exercises.length; j++){
            if(templates[i].idExercise == exercises[j].id){
                tmpExercises[templates[i].exerciseOrder-1] = exercises[j]
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
        id: db_result.id,
        name: db_result.name,
        info: db_result.info,
        idCreator: db_result.idCreator,
        setCreation: db_result.setCreation,
        idBaseLanguage: db_result.idBaseLanguage,
        idLearnLanguage: db_result.idLearnLanguage,
        isWordSet: db_result.isWordSet,
        popularity: db_result.popularity,
        ifVideo: db_result.ifVideo,
        ifAudio: db_result.ifAudio,
        ifPicture: db_result.ifPicture
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
        var set = createResponseSet(result[0]);
        sql = 'SELECT SetsExercises.id,SetsExercises.idExercise,TemplatesInfo.name,SetsExercises.exerciseOrder FROM SetsExercises, TemplatesInfo WHERE TemplatesInfo.id = SetsExercises.idTemplate AND SetsExercises.idSet = ' + req.params.id
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
                sql = 'SELECT `FillSentenceExerciseTemplate`.*,`IncorrectWordsFillSentenceExerciseTemplate`.word AS incorrect '
                sql += ' FROM `FillSentenceExerciseTemplate`' 
                sql += ' LEFT JOIN IncorrectWordsFillSentenceExerciseTemplate '
                sql += ' ON `FillSentenceExerciseTemplate`.id=`IncorrectWordsFillSentenceExerciseTemplate`.idFillSentenceExerciseTemplate '
                sql += ' WHERE FillSentenceExerciseTemplate.id IN ' + ids
                db.query(sql,function(result:any){
                    if(result == 0)
                        return 
                    var readyExercises=[{}]
                    readyExercises.pop()
                    var next = false
                    for (var i = 0; i < result.length ; i++){ 
                        next = false
                        for(var j = 0;j<readyExercises.length;j++){
                            if(readyExercises[j]==result[i].id){
                                var next = true
                                continue
                            }
                        }
                        if(next) continue  
                        readyExercises.push(result[i].id)
                        var incorrectWords =[]
                        for (var j = 0; j < result.length ; j++){
                            if(result[j].id == result[i].id && result[j].incorrect != null)
                                incorrectWords.push(result[j].incorrect)
                        }
                        exercises.push({
                            id:result[i].id,
                            template:'FillSentenceExerciseTemplate',
                            leftPartOfSentence:result[i].leftPartOfSentence,
                            wordToFill:result[i].wordToFill,
                            rightPartOfSentence: result[i].rightPartOfSentence,
                            incorrectWords: incorrectWords})
                    }
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

router.get('/sets', auth.authenticateToken, (req, res) =>{
    common.adminLog("Sets search.")
    var sql = 'SELECT * FROM `ExerciseSets` WHERE deleted = 0 OR deleted is null'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        var sets =[]
        for(var i=0;i<result.length;i++){
            sets.push(createResponseSet(result[i]))
        }
        res.json(sets)
    })
})

router.get('/my-sets', auth.authenticateToken, (req:any, res) =>{
    common.adminLog("User sets search.")
    var sql = 'SELECT * FROM `ExerciseSets` WHERE (deleted = 0 OR deleted is null) and idCreator = ' + req.user.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        var sets =[]
        for(var i=0;i<result.length;i++){
            sets.push(createResponseSet(result[i]))
        }
        res.json(sets)
    })
})

function insertIntoSetsExercises(setId:any,templateId:any,exerciseId:any,exerciseOrder:any){
    var sql='INSERT INTO `SetsExercises` (`idSet`, `idTemplate`, `idExercise`,`exerciseOrder`)'
    sql+='VALUES ('+setId+', '+templateId+', '+exerciseId+','+exerciseOrder+')'
    db.query(sql,function(result:any){
        if(result == 0){
            return
        }     
        common.adminLog("Insert into SetsExercises for setId:"+setId+" and exerciseId:"+exerciseId+".")                    
    })
}

function insertIntoIncorrectWords(exerciseId:any,words:any){
    if(words == undefined) return 
    for(var i=0;i<words.length;i++){
        var sql='INSERT INTO `IncorrectWordsFillSentenceExerciseTemplate` (`word`, `idFillSentenceExerciseTemplate`)'
        sql+='VALUES ("'+words[i].word+'", '+exerciseId+')'
        db.query(sql,function(result:any){
            if(result == 0){
                return
            }     
            common.adminLog("Insert into IncorrectWordsFillSentenceExerciseTemplate for exerciseId:"+exerciseId+".")                    
        })
    }   
}

function insertIntoFillSentenceTemplate(exercise:any,setId:any){
    var sql = 'INSERT INTO `FillSentenceExerciseTemplate` (`idSet`, `leftPartOfSentence`, `wordToFill`,`rightPartOfSentence`,`videoPath`, `audioPath`, `picturePath`) '
    sql +='VALUES ('+setId+', "'+exercise.leftPartOfSentence+'", "'+exercise.wordToFill+'","'+exercise.rightPartOfSentence+'", NULL, NULL, NULL)'
    db.query(sql,function(result:any){
        if(result == 0){
            return
        } 
        var exerciseId = result.insertId
        common.adminLog("Insert into FillSentenceExerciseTemplate for setId:"+setId+" .")
        insertIntoSetsExercises(setId,2,exerciseId,exercise.id)
        insertIntoIncorrectWords(exerciseId,exercise.incorrectWords)
    })
}

function insertIntoWordTemplate(exercise:any,setId:any){
    var sql = 'INSERT INTO `WordExerciseTemplate` (`idSet`, `word`, `translation`, `videoPath`, `audioPath`, `picturePath`) '
    sql +='VALUES ('+setId+', "'+exercise.word+'", "'+exercise.translation+'", NULL, NULL, NULL)'
    db.query(sql,function(result:any){
        if(result == 0){
            return
        } 
        var exerciseId = result.insertId
        common.adminLog("Insert into WordExerciseTemplate for setId:"+setId+" .")
        insertIntoSetsExercises(setId,1,exerciseId,exercise.id)
    })
}
function insertTranslateSentenceTemplate(exercise:any,setId:any){
    var sql = ' INSERT INTO `TranslateSentenceExerciseTemplate` (`idSet`, `oryginalSentence`, `translatedSentence`,`videoPath`, `audioPath`, `picturePath`) '
    sql +='VALUES ('+setId+', "'+exercise.oryginalSentence+'", "'+exercise.translatedSentence+'", NULL, NULL, NULL)'
    db.query(sql,function(result:any){
        if(result == 0){
            return
        } 
        var exerciseId = result.insertId
        common.adminLog("Insert into TranslateSentenceExerciseTemplate for setId:"+setId+" .")
        insertIntoSetsExercises(setId,3,exerciseId,exercise.id)
    })
}



router.post('/add-set', auth.authenticateToken, (req:any, res) => {
    common.adminLog(req.body)
    var setName = req.body.setInfo.name
    var setInfo = req.body.setInfo.info
    var setCreatorId = req.user.id
    var date= new Date()
    var setCreationDate = date.getUTCFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    var setBaseLanId = req.body.setInfo.idBaseLanguage
    var setLearnLanId = req.body.setInfo.idLearnLanguage
    var setIsWordset = req.body.setInfo.isWordSet
    var setPopularity = 1
    var setIfVideo = null
    var setIfAudio = null
    var setIfPicture = null
    var exercises = req.body.exercises
    var setId;
    // checking data from client
    if(setName == undefined){
        res.status(400).json({error: "Data error - name."})
        return
    }
    if(setInfo == undefined){
        res.status(400).json({error: "Data error - info."})
        return
    }
    if(setBaseLanId == undefined){
        res.status(400).json({error: "Data error - language."})
        common.adminLog(setBaseLanId)
        return
    }
    if(setLearnLanId == undefined){
        res.status(400).json({error: "Data error - language."})
        common.adminLog(setLearnLanId)
        return
    }
    if(exercises == undefined){
        res.status(400).json({error: "Data error - exercises."})
        return
    }
    for(var i =0; i<exercises.length; i++){
        if(exercises[i].template == undefined){
            res.status(400).json({error: "Data error - template."})
            return
        }
        else if(exercises[i].id == undefined){
            res.status(400).json({error: "Data error - id."})
            return
        }
        else if(exercises[i].template == 'TranslateSentenceExerciseTemplate' && (exercises[i].oryginalSentence== undefined || exercises[i].translatedSentence == undefined)){
            res.status(400).json({error: "Data error - TranslateSentenceExerciseTemplate."})
            return
        }
        else if(exercises[i].template == 'WordExerciseTemplate' && ( exercises[i].word==undefined || exercises[i].translation == undefined)){
            res.status(400).json({error: "Data error - WordExerciseTemplate."})
            return
        }
        else if(exercises[i].template == 'FillSentenceExerciseTemplate' && (exercises[i].leftPartOfSentence == undefined || exercises[i].wordToFill==undefined || exercises[i].rightPartOfSentence == undefined)){
            res.status(400).json({error: "Data error - FillSentenceExerciseTemplate."})
            return
        }
    }
    if(setIsWordset == undefined) setIsWordset = null

    // Inserting data to database
    var sql = 'INSERT INTO `ExerciseSets` (`name`, `info`, `idCreator`, `setCreation`, `idBaseLanguage`, `idLearnLanguage`,`isWordSet`, `popularity`, `ifVideo`, `ifAudio`, `ifPicture`)'
    sql += 'VALUES ("'+setName+'", "'+setInfo+'", "'+setCreatorId+'","'+setCreationDate+'", '+setBaseLanId+', '+setLearnLanId+', '+setIsWordset+', '+setPopularity+', '+setIfVideo+', '+setIfAudio+', '+setIfPicture+')'
    
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(401).json({error: "Insertion error."})
            return
        } 
        setId = result.insertId
        res.status(200).json({setId: setId})
        common.adminLog("Insert into ExerciseSets.")
        for(var i = 0; i< exercises.length;i++){
            if(exercises[i].template == 'FillSentenceExerciseTemplate'){
                insertIntoFillSentenceTemplate(exercises[i],setId)
            }
            else if(exercises[i].template == 'TranslateSentenceExerciseTemplate'){
                insertTranslateSentenceTemplate(exercises[i],setId)
            }
            else if(exercises[i].template == 'WordExerciseTemplate'){
                insertIntoWordTemplate(exercises[i],setId)
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



module.exports = router;