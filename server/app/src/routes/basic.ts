import express = require('express')
const router = express.Router();
import {db} from '../database'
import common = require("../common")

//informacje o mozliwych funkcjach api
router.get('/info', (req, res) => {
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
router.get('/languageinfo/:id', (req:any, res) => {
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

//pobieranie informacji o wszystkich jezykach
router.get('/languages', (req:any, res) => {
    common.adminLog("Language info.")
    let sql = 'SELECT * FROM `Languages`'
    db.query(sql,function(result:any){
        if(result == 0){
            res.status(404).json({error: "No result."})
            return
        } 
        common.adminLog('Preparing and sending language info.')
        var languages =[]
        for(var i=0;i<result.length;i++)
            languages.push({
                id: result[i].id,
                code: result[i].code,
                name: result[i].name,
                info: result[i].info
            })
        var lanRes={
            languages:languages
        }
        res.json(lanRes)
    })
})

module.exports = router