"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLog = void 0;
function adminLog(message) {
    if (process.env.ADMIN == "admin")
        console.log(message);
}
exports.adminLog = adminLog;
