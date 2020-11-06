"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.authenticateToken = void 0;
var jwt = require("jsonwebtoken");
var common = require("./common");
function authenticateToken(req, res, next) {
    common.adminLog('Token authorization.');
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        common.adminLog("Token missing.");
        return res.status(401).json({ error: "Token missing." });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            common.adminLog("Token rejected.");
            return res.status(403).json({ error: "Token rejected." });
        }
        common.adminLog("Token accepted.");
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
function createToken(userInfo) {
    return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
}
exports.createToken = createToken;
