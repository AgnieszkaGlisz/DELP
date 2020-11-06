import express = require('express')
import fs = require('fs')
import jwt = require('jsonwebtoken')
import Database = require('./database')
import User = require('./user')
import cors = require('cors')

//inicjacja zmiennych srodowiskowych
require('dotenv').config()
 
//tworzenie obiektu serwera
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())

//tworzenie obiektu Bazy danych do wykonywania zapytań
const db = new Database()

function adminLog(message:string){
    if(process.env.ADMIN=="admin") console.log(message)
}

function authenticateToken(req:any,res:any,next:any){
    adminLog('Token authorization.')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null) {        
        adminLog("Token missing.")
        return res.sendStatus(401).json({error: "Token missing."})
    }
    jwt.verify(token, <string>process.env.ACCESS_TOKEN_SECRET,(err:any,user:any) =>{
        if(err){  
            adminLog("Token rejected.")
            return res.sendStatus(403).json({error: "Token rejected."})
        }
        adminLog("Token accepted.")
        req.user = user
        next()
    })
}

//pobieranie danych uzytkownika
app.get('/account', authenticateToken, (req:any, res) => {
    adminLog("Pobieranie danych uzytkownika.")
    let sql = 'SELECT U.id,U.username,U.email,U.name,U.surname,U.birthday,U.accountCreation,U.idFirstLanguage,U.isBlocked,UP.idColorSets,UP.fontSize,UP.noSound, L.code as lanCode, L.name as lanName FROM `Users` U, `UserPreferences` UP, `Languages` L WHERE U.id = UP.id and U.idFirstLanguage = L.id and U.id = ' + req.user.id
    db.query(sql,function(result:any){
        //gdy brak preferences lub users moze tez przy languages
        if(result == 0){
            res.json({error: "User data error."})
            return
        } 
        //udalo sie pobrac dane z bazy
        adminLog('Pobrano dane uzytkownika.')
        //uzytkownik zablokowany
        if(result[0].isBlocked == true){
            adminLog('Uzytkownik zablokowany.')
            res.json({error: "User is blocked."})
            return
        }
        //przygotowanie danych i odeslanie 
        adminLog('Przygotowanie i wysylanie danych uzytkownika.')
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
            res.json({error: "Invalid login or password."})
            return
        } 
        var userInfo={
            id: result[0].id,
            username: result[0].username
        }
        const accessToken = jwt.sign(userInfo,<string>process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
    })
})

//pobieranie wszystkich użytkowników z bazy
app.get('/users', (req, res) => {
    var sql = 'SELECT * FROM Users'
    db.query(sql,function(result:any){
        if(result == 0) return
        console.log('Creating response.')
        var users = []
        for (var i = 0; i < result.length; i++) {
            users.push({
                id: result[i].id,
                name: result[i].name,
                surname: result[i].surname,
                login: result[i].login,
                password: result[i].password,
                email: result[i].email
            })
        }
        console.log("Sending data to client.")
        res.json(users)
        console.log("Data sent.")
    })
})

//wlaczenie serwera nasluchiwanie na porcie ustawionym .env lub 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log("Listening on PORT: " + port))

// app.get('/uzytkownicy/:login', (req, res) => {
//     console.log('Searching for user: ', req.params.login);