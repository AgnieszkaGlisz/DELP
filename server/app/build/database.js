"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql = require('mysql');
var common = require("./common");
var Database = /** @class */ (function () {
    //tworzenie połączenia z bazą
    function Database() {
        this.dbconfig = {
            connectionLimit: 10,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
        this.pool = mysql.createPool(this.dbconfig);
    }
    //zapytanie do bazy callback jest funkcją wywoływaną po zakończonym zapytaniu
    //gdy udane zwraca dane z bazy gdy nie udane zwraca 0
    Database.prototype.query = function (sql, callback) {
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_DATABASE);
        this.pool.query(sql, function (err, result) {
            try {
                if (err) {
                    throw err;
                }
                else {
                    common.adminLog('Query succeed.');
                    return callback(result);
                }
            }
            catch (err) {
                common.adminLog('Query error: ' + err);
                return callback(0);
            }
        });
    };
    return Database;
}());
//tworzenie obiektu Bazy danych do wykonywania zapytań
var db = new Database();
exports.db = db;
