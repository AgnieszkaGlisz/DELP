import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

router.get('/xd', (req,res) => {
    
    res.send("xd");
})

router.get('/w', (req, res) =>{
    console.log("c;")
})


module.exports = router;