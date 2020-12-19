var mysql = require('mysql')
import common = require("./common")

class Database {
    private dbconfig = {
        connectionLimit : 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
    private pool
    //tworzenie połączenia z bazą
    constructor() {
        this.pool  = mysql.createPool(this.dbconfig)
    }
    //zapytanie do bazy callback jest funkcją wywoływaną po zakończonym zapytaniu
    //gdy udane zwraca dane z bazy gdy nie udane zwraca 0
    public query(sql:string, callback:any){
        this.pool.query(sql, function (err : any, result : any) {
            try {
                if (err){ 
                    throw err
                }
                else{   
                    common.adminLog('Query succeed.')
                    return callback(result)
                } 
            }
            catch(err){
                common.adminLog('Query error: '+ err)
                return callback(0)
            }
        })
    }
}
//tworzenie obiektu Bazy danych do wykonywania zapytań
const db = new Database()
export {db}