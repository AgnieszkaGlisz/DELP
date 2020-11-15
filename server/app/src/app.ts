//inicjacja zmiennych srodowiskowych
require('dotenv').config()

import express = require('express')
import cors = require('cors')

import common = require("./common")
 
//tworzenie obiektu serwera
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())

//routing
const routerWords = require('./routes/words')
app.use(routerWords)
const routerSets = require('./routes/sets')
app.use(routerSets)
const routerUser = require('./routes/user')
app.use(routerUser)
const routerBasic = require('./routes/basic')
app.use(routerBasic)


//wlaczenie serwera nasluchiwanie na porcie ustawionym .env lub 3000
const port = process.env.PORT || 3000
app.listen(port, () => common.adminLog("Listening on PORT: " + port))

module.exports = app