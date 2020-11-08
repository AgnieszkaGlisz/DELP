//inicjacja zmiennych srodowiskowych
require('dotenv').config()

import express = require('express')
import cors = require('cors')

import {db} from './database'
import auth = require("./auth")
import common = require("./common")
 
//tworzenie obiektu serwera
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())
const routerWords = require('./routes/words')
app.use(routerWords)

//informacje o mozliwych funkcjach api
app.get('/apiinfo', (req, res) => {
    common.adminLog('Preparing routes info for user.')
    let info = {
        '/apiinfo':'Information about api routes.',
        '/login':'Creates authentication token based on username and password.',
        '/account':'Basic user information. Needs authentication token.',
        '/favourite':'Favourite wordsets and lessons.',
        '/languageinfo/:id':'Information about language based on id.'
    }
    res.json(info)
})

//logowanie 
app.post('/login', (req, res) => {
    var sql = 'SELECT * FROM Users where username = "' + req.body.username + '" and password = "' + req.body.password + '"'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(401).json({error: "Invalid login or password."})
            return
        } 
        if(result[0].isBlocked == true){
            common.adminLog('User is blocked.')
            res.status(403).json({error: 'User is blocked.'})
            return
        }
        const accessToken = auth.createToken(result[0].id, result[0].username)
        res.json({accessToken: accessToken})
    })
})

//pobieranie danych uzytkownika
app.get('/account', auth.authenticateToken, (req:any, res) => {
    common.adminLog("User info.")
    let sql = 'SELECT U.id,U.username,U.email,U.name,U.surname,U.birthday,U.accountCreation,U.idFirstLanguage,U.isBlocked,UP.idColorSets,UP.fontSize,UP.noSound, L.code as lanCode, L.name as lanName FROM `Users` U, `UserPreferences` UP, `Languages` L WHERE U.id = UP.id and U.idFirstLanguage = L.id and U.id = ' + req.user.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "User data error."})
            return
        }
        common.adminLog('Preparing and sending user info.')
        var userPreferences = {
            idColorSets: result[0].idColorSets,
            fontSize: result[0].fontSize,
            noSound: result[0].noSound
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

//pobieranie ulubionych Wordsetow
app.get('/favourite', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Favourite sets.")
    let sql = 'SELECT ExerciseSets.*, Users.username FROM `Users`,`FavouriteSets`,`ExerciseSets` WHERE ExerciseSets.id=FavouriteSets.idSet AND Users.id = FavouriteSets.idUser AND FavouriteSets.idUser = ' + req.user.id; 
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No favourite sets."})
            return
        } 
        common.adminLog('Preparing and sending favourite sets.')
        var wordsets = []
        var lessons = []
        for (var i = 0; i< result.length; i++){
            if(result[i].isWordSet == true)
                wordsets.push({
                    id: result[i].id,
                    name: result[i].name,
                    info: result[i].info,
                    idCreator: result[i].idCreator,
                    usernameCreator: result[i].username,
                    idBaseLanguage: result[i].idBaseLanguage,
                    idLearnLanguage: result[i].idLearnLanguage,
                    ifVideo: result[i].ifVideo,
                    ifAudio: result[i].ifAudio,
                    ifPicture: result[i].ifPicture
                })
            else
                lessons.push({
                    id: result[i].id,
                    name: result[i].name,
                    info: result[i].info,
                    idCreator: result[i].idCreator,
                    nickCreator: result[i].nickCreator,
                    idBaseLanguage: result[i].idBaseLanguage,
                    idLearnLanguage: result[i].idLearnLanguage,
                    BaseLanguage: result[i].BaseLanguage,
                    LearnLanguage: result[i].LearnLanguage,
                    ifVideo: result[i].ifVideo,
                    ifAudio: result[i].ifAudio,
                    ifPicture: result[i].ifPicture
                })     
        }
        var favourite = {
            wordsets: wordsets,
            lessons: lessons
        }
        res.json(favourite)
    })
})

//pobieranie informacji o jezyku
app.get('/languageinfo/:id', auth.authenticateToken, (req:any, res) => {
    common.adminLog("Language info.")
    let sql = 'SELECT * FROM `Languages` WHERE id = ' + req.params.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        common.adminLog('Preparing and sending language info.')
        var language = {
            id: result[0].id,
            code: result[0].code,
            name: result[0].name,
            info: result[0].info
        }
        res.json(language)
    })
})

//nieobsluzone sciezki
app.all('*', (req, res) => {
    common.adminLog('Route unhandled.')
    res.status(404).json({error: "Are you lost?"})
})

//wlaczenie serwera nasluchiwanie na porcie ustawionym .env lub 3000
const port = process.env.PORT || 3000
app.listen(port, () => common.adminLog("Listening on PORT: " + port))