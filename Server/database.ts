var mysql = require('mysql');

class Database {

    private dbconfig = {
        connectionLimit : 10,
        host: 'agraleba.pl',
        user: 'agraleba_delp',
        password: 'delp2020',
        database:'agraleba_delp'
    };
    private pool;
    //tworzenie połączenia z bazą
    constructor() {
        this.pool  = mysql.createPool(this.dbconfig);
    }
    //zapytanie do bazy callback jest funkcją wywoływaną po zakończonym zapytaniu
    //gdy udane zwraca dane z bazy gdy nie udane zwraca 0
    public query(sql:string, callback:any){
        this.pool.query(sql, function (err : any, result : any) {
            try {
                if (err){ 
                    throw err;
                }
                else{
                    return callback(result);
                } 
            }
            catch(err){
                console.log('ERROR QUERY: ',err);
                return callback(0);
            }
        });
    }
}
export = Database;