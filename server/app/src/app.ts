import express = require('express')
import cors = require('cors')

import Database = require('./database')
import auth = require("./auth")
import common = require("./common")

//inicjacja zmiennych srodowiskowych
require('dotenv').config()
 
//tworzenie obiektu serwera
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())

//tworzenie obiektu Bazy danych do wykonywania zapytań
const db = new Database()

//informacje o mozliwych funkcjach api
app.get('/apiinfo', (req, res) => {
    common.adminLog('Preparing routes info for user.')
    let info = {
        '/apiinfo':'Information about api routes.',
        '/login':'Creates authentication token based on username and password.',
        '/account':'Basic user information. Needs authentication token.'
    }
    res.json(info)
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
        if(result[0].isBlocked == true){
            common.adminLog('User is blocked.')
            res.status(403).json({error: 'User is blocked.'})
            return
        }
        common.adminLog('Preparing and sending user info.')
        var userPreferences = {
            idColorSets: result[0].idColorSets,
            fontSize: result[0].fontSize,
            noSound: result[0].noSound
        }
        var userInfo ={
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

//logowanie 
app.post('/login', (req, res) => {
    var sql = 'SELECT * FROM Users where username = "' + req.body.username + '" and password = "' + req.body.password + '"'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(401).json({error: "Invalid login or password."})
            return
        } 
        var userInfo={
            id: result[0].id,
            username: result[0].username
        }
        const accessToken = auth.createToken(userInfo)
        res.json({accessToken: accessToken})
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

// app.get('/uzytkownicy/:login', (req, res) => {
//     console.log('Searching for user: ', req.params.login);