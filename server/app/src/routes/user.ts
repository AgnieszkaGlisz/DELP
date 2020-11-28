import express = require('express')
import bcrypt = require('bcrypt')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

router.post('/register', (req, res) => {
    var username = req.body.userInfo.username
    var password = req.body.userInfo.password
    var email = req.body.userInfo.email
    var name = req.body.userInfo.name
    var surname  = req.body.userInfo.surname
    var birthday  = req.body.userInfo.birthday
    var idFirstLanguage = req.body.userInfo.idFirstLanguage
    var idColorSets = req.body.preferences.idColorSets
    var fontSize = req.body.preferences.fontSize
    var noSound  = req.body.preferences.noSound
    var date = new Date()
    var accountCreation = date.getUTCFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    try{
        if(username == undefined || password==undefined || email == undefined || idFirstLanguage==undefined){
            res.status(403).json({error: "Data error."})
            return
        }
        if(name == undefined){
            name = "";
        }
        if(surname == undefined){
            surname = "";
        }
        if(birthday == undefined){
            birthday = accountCreation;
        }
        if(idColorSets == undefined){
            idColorSets = 1;
        }
        if(fontSize == undefined){
            fontSize = null;
        }
        if(noSound == undefined){
            noSound = null;
        }
    }
    
    catch(err){
        console.log(err)
        return
    }
    var sql = 'SELECT * FROM Users where username = "' + username + '"'
    db.query(sql,function(result:any){
        if(result != 0){
            res.status(401).json({error: "User already exists."})
            return
        } 
        bcrypt.hash(password, 10, (err, hash) => {
            sql = 'INSERT INTO `Users` (`username`, `password`, `email`, `name`, `surname`, `birthday`, `accountCreation`, `idFirstLanguage`)'
            sql +=' VALUES ("'+username+'", "'+hash+'", "'+email+'", "'+name+'", "'+surname+'", "'+birthday+'", "'+accountCreation+'",'+idFirstLanguage+')'
            db.query(sql,function(result:any){
                if(result == 0){
                    res.status(401).json({error: "Error."})
                    return
                } 
                var userId = result.insertId
                sql = 'INSERT INTO `UserPreferences` (`idUser`, `idColorSets`, `fontSize`,`noSound`) '
                sql +='VALUES ('+userId+', '+idColorSets+',' +fontSize+','+noSound+')'
                db.query(sql,function(result:any){
                    if(result == 0){
                        res.status(401).json({error: "Error."})
                        return
                    } 
                    res.json({message: "User registered."})
                })
            })
        })
    })
})

//logowanie
router.post('/login', (req, res) => {
    try{
        if(req.body.username == undefined || req.body.password==undefined){
            res.status(403).json({error: "No login or password."})
            return
        }
    }
    catch(err){
        console.log(err)
        return
    }
    var sql = 'SELECT * FROM Users where username = "' + req.body.username + '"'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(401).json({error: "Invalid login or password."})
            return
        } 
        bcrypt.compare(req.body.password, result[0].password, function(err, goodPassword) {
            if(goodPassword==true){
                if(result[0].isBlocked == true){
                    common.adminLog('User is blocked.')
                    res.status(403).json({error: 'User is blocked.'})
                    return
                }
                const accessToken = auth.createToken(result[0].id, result[0].username)
                res.json({accessToken: accessToken})
            }
            else res.status(401).json({error: "Invalid login or password.1"})
            return
          });
    })
})


//pobieranie danych uzytkownika
router.get('/user/account', auth.authenticateToken, (req:any, res) => {
    common.adminLog("User info.")
    let sql = 'SELECT U.id,U.username,U.email,U.name,U.surname,U.birthday,U.accountCreation,U.idFirstLanguage,U.isBlocked,UP.idColorSets,UP.fontSize,UP.noSound,UP.noSight, L.code as lanCode, L.name as lanName FROM `Users` U, `UserPreferences` UP, `Languages` L WHERE U.id = UP.id and U.idFirstLanguage = L.id and U.id = ' + req.user.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "User data error."})
            return
        }
        common.adminLog('Preparing and sending user info.')
        var userPreferences = {
            idColorSets: result[0].idColorSets,
            fontSize: result[0].fontSize,
            noSound: result[0].noSound,
            noSight: result[0].noSight
        }
        var userInfo = {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
            name: result[0].name,
            surname: result[0].surname,
            birthday: result[0].birthday,
            accountCreation: result[0].accountCreation,
            idFirstLanguage:result[0].idFirstLanguage,
            firstLanguage: result[0].lanName,
            preferences: userPreferences
        }
        res.json(userInfo)
    })
})

//pobieranie ulubionych setow
router.get('/favourite', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Favourite sets.")
    let sql = 'SELECT DISTINCT ExerciseSets.*, Users.username FROM `Users`,`FavouriteSets`,`ExerciseSets` WHERE ExerciseSets.id=FavouriteSets.idSet AND Users.id = FavouriteSets.idUser AND FavouriteSets.idUser = ' + req.user.id; 
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No favourite sets."})
            return
        } 
        common.adminLog('Preparing and sending favourite sets.')
        var sets = []
        for (var i = 0; i< result.length; i++){
            sets.push({
                id: result[i].id,
                name: result[i].name,
                info: result[i].info,
                idCreator: result[i].idCreator,
                usernameCreator: result[i].username,
                isWordSet:  result[i].isWordSet,
                idBaseLanguage: result[i].idBaseLanguage,
                idLearnLanguage: result[i].idLearnLanguage,
                ifVideo: result[i].ifVideo,
                ifAudio: result[i].ifAudio,
                ifPicture: result[i].ifPicture
            })  
        }
        res.json(sets)
    })
})

//dodawanie do ulubionych
router.get('/favourite/add/:id', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Adding set to favourites.")
    let sql = 'INSERT INTO `FavouriteSets` (`idSet`, `idUser`) VALUES ("'+req.params.id+'", "'+req.user.id+'")'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        sql = 'UPDATE `ExerciseSets` SET popularity = popularity + 1 WHERE id = ' + req.params.id
        db.query(sql,function(result:any){})
        common.adminLog('Set added to favourites.')
        
        res.json({OK:"Set added to favourites."})
    })
})

//usuwanie z ulubionych
router.get('/favourite/delete/:id', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Deleting set from favourites.")
    let sql = 'DELETE FROM `FavouriteSets` WHERE idSet = '+req.params.id+' AND  idUser = '+req.user.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        sql = 'UPDATE `ExerciseSets` SET popularity = popularity - ' + result.affectedRows + ' WHERE id = ' + req.params.id
        db.query(sql,function(result:any){})
        common.adminLog('Set deleted from favourites.')
        
        res.json({OK:"Set deleted from favourites."})
    })
})

function createSqlUpdatePreferences(req:any):string{
    var sql = 'UPDATE `UserPreferences` SET '
    var first = true
    if((req.body.fontSize!=undefined || req.body.fontSize!=null)){
        sql += ' fontSize = ' +  req.body.fontSize
        first = false
    }
    if((req.body.noSound!=undefined || req.body.noSound!=null)){
        if(!first) sql += ","
        sql += ' noSound = ' +  req.body.noSound
        first = false
    }
    if((req.body.noSight!=undefined || req.body.noSight!=null)){
        if(!first) sql += ","
        sql += ' noSight = ' +  req.body.noSight
        first = false
    }
    if((req.body.idColorSets!=undefined || req.body.idColorSets!=null)){
        if(!first) sql += ","
        sql += ' idColorSets = ' +  req.body.idColorSets
    }
    sql += ' WHERE idUser = ' + req.user.id
    return sql
}

//zmiana preferences uzytkownika 
router.post('/preferences', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Updating preferences.")
    if((req.body.fontSize==undefined || req.body.fontSize==null) && 
       (req.body.noSound==undefined || req.body.noSound==null) && 
       (req.body.idColorSets==undefined || req.body.idColorSets==null) && 
       (req.body.noSight==undefined || req.body.noSight==null)){
        res.status(404).json({error: "Data error."})
        return
    }
    var sql = createSqlUpdatePreferences(req)
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        common.adminLog('Preferences updated.')
        res.json({message:"Preferences updated."})
    })
})
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

router.get('/sets', auth.authenticateToken, (req:any, res) =>{
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

module.exports = router