import express = require('express')
import fs = require('fs')
import jwt = require('jsonwebtoken')
import Database = require('./database')
import User = require('./user')
import cors = require('cors')

//inicjacja zmiennych srodowiskowych
require('dotenv').config()
 
//tworzenie obiektu serwera
const app = express()
app.use(cors({origin:"*"}))
//app.use(express.json())
//tworzenie obiektu Bazy danych do wykonywania zapytań
const db = new Database()


app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/wordset', (req, res) =>{
    var sql = 'SELECT * FROM WordExerciseTemplate'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response. - wordset')
            var wordTemp ={
                id: result[0].id,
                idSet: result[0].idSet,
                word: result[0].word,
                translation: result[0].translation,
                videoPath: result[0].videoPath,
                audioPath: result[0].audioPath,
                picturePath: result[0].picturePath}
            res.json(wordTemp)
        }
        res.send(JSON.stringify(wordTemp))
        console.log("data send" + wordTemp)
    })
    
})

function authenticateToken(req:any,res:any,next:any){
    if(process.env.ADMIN=="admin") console.log('Identyfikacja uzytkownika oraz wyciąganie danych z klucza dostępu.')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //gdy brak klucza
    if ( token == null) {        
        return res.sendStatus(401)
    }
    else{
        jwt.verify(token, <string>process.env.ACCESS_TOKEN_SECRET,(err:any,user:any) =>{
            if(err){  
                return res.sendStatus(403)
            }
            else{
                req.user = user
                next()
            }
        })
    }
}


app.get('/account', authenticateToken, (req:any, res) => {
    var sql = 'SELECT * FROM Users where id = ' + req.user.id
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            console.log('Creating response.')
            var userInfo ={
                id: result[0].id,
                name: result[0].name,
                surname: result[0].surname,
                login: result[0].login,
                password: result[0].password,
                email: result[0].email}
            res.json(userInfo)
        }
           // res.contentType('application/json')

          ///  console.log("Sending data to client.")
          //  res.send(JSON.stringify(JSONObject))
           // console.log("Data sent.")
    })
})

app.post('/login', (req, res) => {
    console.log(req)
    var sql = 'SELECT * FROM Users where login = "' + req.body.username + '" and password = "' + req.body.password + '"'
    db.query(sql,function(result:any){
        if(result == 0){
            res.json({accessToken: 0})
            return
        } 
        else {
            var userInfo={
                id: result[0].id,
                login: result[0].login,
                password: result[0].password,
            }
            const accessToken = jwt.sign(userInfo,<string>process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken})
        }
        
    })





    // const username = req.body.username
    // const user = {name: username}//new User(username)
    // const accessToken = jwt.sign(user,<string>process.env.ACCESS_TOKEN_SECRET)
    // res.json({accessToken: accessToken})
})

//pobieranie wszystkich użytkowników z bazy
app.get('/users', (req, res) => {
    var sql = 'SELECT * FROM Users'
    db.query(sql,function(result:any){
        if(result == 0) return
        var numberOfProducts = result.length
        if (numberOfProducts == 0) {
            res.send('Brak uzytkownikow.')
        }
        else {
            console.log('Creating response.')
            var JSONObject = []
            for (var i = 0; i < numberOfProducts; i++) {
                JSONObject.push({
                    id: result[i].id,
                    name: result[i].name,
                    surname: result[i].surname,
                    login: result[i].login,
                    password: result[i].password,
                    email: result[i].email
                })
            }
            res.contentType('application/json')

            console.log("Sending data to client.")
            res.send(JSON.stringify(JSONObject))
            console.log("Data sent.")
        }
        
    })
})


//wlaczenie serwera nasluchiwanie na porcie 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log("Listening on PORT: " + port))




// app.get('/uzytkownicy/:login', (req, res) => {
//     console.log('Searching for user: ', req.params.login);
    
//     var db_connection = getDatabase();
//     console.log("Connecting to database.");
//     db_connection.connect(function (error) {
//         if (error) {
//             throw error;
//         }
//         else {
//             console.log("Connected to database.");
//             var sql = 'SELECT * FROM inzynierka_aplikacja_jezyki.uzytkownicy WHERE login = "' + req.params.login + '"';

//             db_connection.query(sql, function (error, result) {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     console.log("Query succeed.");
//                     var numberOfProducts = result.length;
//                     if (numberOfProducts == 0) {
//                         res.send('Brak uzytkownika: '+ req.params.login);
//                     }
//                     else {
//                         var JSONObject = [];
//                         for (var i = 0; i < numberOfProducts; i++) {
//                             JSONObject.push({
//                                 id: result[i].id,
//                                 imie: result[i].imie,
//                                 nazwisko: result[i].nazwisko,
//                                 login: result[i].login,
//                                 email: result[i].email,
//                                 data_urodzenia: result[i].data_urodzenia,
//                                 jezyk_glowny: result[i].jezyk_glowny
//                             });
//                         }
//                         console.log("Sending data to client.");
//                         res.contentType('application/json');
//                         res.send(JSON.stringify(JSONObject));
//                     }
//                 }
//             });
//         }
//     });
// });


// app.get('/ulubione/:login', (req, res) => {
//     console.log('Searching favourite word sets for: ', req.params.login);

//     var db_connection = getDatabase();
//     console.log("Connecting to database.");
//     db_connection.connect(function (error) {
//         if (error) {
//             throw error;
//         }
//         else {
//             console.log("Connected to database.");
//             var sql = 'SELECT zs.id, zs.nazwa,zs.info,zs.data_utworzenia FROM inzynierka_aplikacja_jezyki.wyroznione_zestawy AS wz, inzynierka_aplikacja_jezyki.uzytkownicy AS uz, inzynierka_aplikacja_jezyki.zestawy AS zs WHERE wz.id_zestawu = zs.id AND wz.id_uzytkownika = uz.id AND uz.login ="' + req.params.login +'"';
//             db_connection.query(sql, function (error, result) {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     console.log("Query succeed.");
//                     var numberOfProducts = result.length;
//                     if (numberOfProducts == 0) {
//                         res.send('Brak ulubionych dla: ' + req.params.login);
//                     }
//                     else {
//                         var JSONObject = [];
//                         for (var i = 0; i < numberOfProducts; i++) {
//                             JSONObject.push({
//                                 id: result[i].id,
//                                 nazwa: result[i].nazwa,
//                                 info: result[i].info,
//                                 data_utworzenia: result[i].data
//                             });
//                         }
//                         console.log("Sending data to client.");
//                         res.contentType('application/json');
//                         res.send(JSON.stringify(JSONObject));
//                     }
//                 }
//             });
//         }
//     });
// });

// app.get('/zestawy/:idzestawu', (req, res) => {
//     console.log('Searching for word set: ', req.params.login);

//     var db_connection = getDatabase();
//     console.log("Connecting to database.");
//     db_connection.connect(function (error) {
//         if (error) {
//             throw error;
//         }
//         else {
//             console.log("Connected to database.");
//             var sql = 'SELECT zslow.slowo,zslow.tlumaczenie FROM inzynierka_aplikacja_jezyki.zestaw_slowa zslow WHERE zslow.id_zestawu= "' + req.params.idzestawu + '"';
//             db_connection.query(sql, function (error, result) {
//                 if (error) {
//                     throw error;
//                 }
//                 else {
//                     console.log("Query succeed.");
//                     var html = '';
//                     var numberOfProducts = result.length;
//                     if (numberOfProducts == 0) {
//                         res.send('Brak zestawu');
//                     }
//                     else {
//                         var JSONObject = [];
//                         for (var i = 0; i < numberOfProducts; i++) {
//                             JSONObject.push({
//                                 slowo: result[i].slowo,
//                                 tlumaczenie: result[i].tlumaczenie
//                             });
//                         }
//                         console.log("Sending data to client.");
//                         res.contentType('application/json');
//                         res.send(JSON.stringify(JSONObject));
//                     }
//                 }
//             });
//         }
//     });
// });
