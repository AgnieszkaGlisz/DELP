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
const routerUser = require('./routes/user')
app.use(routerUser)

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