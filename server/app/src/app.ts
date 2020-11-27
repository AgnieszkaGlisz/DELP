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
const routerSets = require('./routes/sets')
app.use('/sets',routerSets)

const routerUser = require('./routes/user')
app.use('/user',routerUser)

const routerBasic = require('./routes/basic')
app.use('/api',routerBasic)

//const routerFiles = require('./routes/files')
//app.use('/set', routerFiles)

//wlaczenie serwera nasluchiwanie na porcie ustawionym .env lub 3000
const port = process.env.PORT || 3000
app.listen(port, () => common.adminLog("Listening on PORT: " + port))

//nieobsluzone sciezki
app.all('*', (req, res) => {
    common.adminLog('Route unhandled.')
    res.status(404).json({error: "Are you lost?"})
})

module.exports = {app}