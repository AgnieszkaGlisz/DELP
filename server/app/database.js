"use strict";
var mysql = require('mysql');
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
        this.pool.query(sql, function (err, result) {
            try {
                if (err) {
                    throw err;
                }
                else {
                    console.log('QUERY SUCCEED');
                    return callback(result);
                }
            }
            catch (err) {
                console.log('ERROR QUERY: ', err);
                return callback(0);
            }
        });
    };
    return Database;
}());
module.exports = Database;
