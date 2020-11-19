import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")


const multer = require('multer')


const storage = multer.diskStorage({
    destination: './pictures',
    filename: function(req:any,file:any,cb:any){
        cb(null,Date.now() + '.' + file.mimetype.split('/')[1])
    }
})
const upload = multer({storage: storage})


router.post('/file/image', upload.single('image'),  (req:any,res) => { //upload.single('set'),
    common.adminLog(req.file)
    common.adminLog(req.body)
    common.adminLog(req.query)
    res.send("ok")
})

router.get('/xd', (req,res) => {
    res.send("xd");
})


module.exports = router;