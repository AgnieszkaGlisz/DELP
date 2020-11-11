import jwt = require('jsonwebtoken')
import common = require("./common")

export function authenticateToken(req:any,res:any,next:any){
    common.adminLog('Token authorization.')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null) {        
        common.adminLog("Token missing.")
        return res.status(401).json({error: "Token missing."})
    }
    jwt.verify(token, <string>process.env.ACCESS_TOKEN_SECRET,(err:any,user:any) =>{
        if(err){  
            common.adminLog("Token rejected.")
            return res.status(403).json({error: "Token rejected."})
        }
        common.adminLog("Token accepted.")
        req.user = user
        common.adminLog(req.body)
        next()
    })
}

export function createToken(id:any, username:any){
    var userInfo={
        id: id,
        username: username
    }
    return jwt.sign(userInfo,<string>process.env.ACCESS_TOKEN_SECRET)
}