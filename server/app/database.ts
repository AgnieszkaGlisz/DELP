var mysql = require('mysql')

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
                    console.log('QUERY SUCCEED')
                    return callback(result)
                } 
            }
            catch(err){
                console.log('ERROR QUERY: ',err)
                return callback(0)
            }
        })
    }
}
export = Database