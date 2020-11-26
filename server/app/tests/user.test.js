require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/user")
const request = require("supertest")
const app = express()
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(serverRoutes)

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

//REGISTER
test('Should not register, data error',async () => {
    await request(app)
    .post('/register')
    .send(
        {
            "userInfo":{
                "username": null,
                "password": "test",
                "email": "test@test.test",
                "name": "Test",
                "surname": "Test",
                "birthday": "2010-10-10",
                "idFirstLanguage": 1
            },
            "preferences":{
                "idColorSets":1,
                "fontSize":null,
                "noSound":null
            }
        }
    )
    .set('Content-Type', 'application/json')
    .expect(403)
})


test('Should not register, user exists',async () => {
    await request(app)
    .post('/register')
    .send(
        {
            "userInfo":{
                "username": "cgrabowski",
                "password": "test",
                "email": "test@test.test",
                "name": "Test",
                "surname": "Test",
                "birthday": "2010-10-10",
                "idFirstLanguage": 1
            },
            "preferences":{
                "idColorSets":1,
                "fontSize":null,
                "noSound":null
            }
        }
    )
    .set('Content-Type', 'application/json')
    .expect(401)
})

//LOGIN
test('Should login',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            'username': "cgrabowski",
            'password': "cgrabowski"
        }
    )
    .set('Content-Type', 'application/json')
    .expect(200)
})

test('Should login and return token',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            'username': "cgrabowski",
            'password': "cgrabowski"
        }
    )
    .set('Content-Type', 'application/json')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('accessToken' in res.body))   throw new Error("Missing token")
      });
})

test('Should not login wrong password or login',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            'username': "cgrabowski1111",
            'password': "cgrabowski"
        }
    )
    .set('Content-Type', 'application/json')
    .expect(401)
})

test('Should not login user blocked',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            'username': "testzablokowany",
            'password': "testzablokowany"
        }
    )
    .set('Content-Type', 'application/json')
    .expect(403)
})

test('Should not login no password or login',async () => {
    await request(app)
    .post('/login')
    .send()
    .set('Content-Type', 'application/json')
    .expect(403)
})

//ACCOUNT
test('Should return user info',async () => {
    await request(app)
    .get('/account')
    .set('authorization', good_token)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('id' in res.body))   throw new Error("Missing id")
        if(!('username' in res.body))   throw new Error("Missing username")
        if(!('email' in res.body))   throw new Error("Missing email")
        if(!('name' in res.body))   throw new Error("Missing name")
        if(!('surname' in res.body))   throw new Error("Missing surname")
        if(!('birthday' in res.body))   throw new Error("Missing birthday")
        if(!('accountCreation' in res.body))   throw new Error("Missing accountCreation")
        if(!('idFirstLanguage' in res.body))   throw new Error("Missing idFirstLanguage")
        if(!('firstLanguage' in res.body))   throw new Error("Missing firstLanguage")
        if(!('preferences' in res.body))   throw new Error("Missing preferences")
      });
})


//ADD FAVOURITES
test('Should add set to favourite set list',async () => {
    await request(app)
    .get('/add-favourite/1')
    .set('authorization', good_token)
    .expect(200)
})


//FAVOURITES
test('Should get favourite set list',async () => {
    await request(app)
    .get('/favourite')
    .set('authorization', good_token)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('wordsets' in res.body))   throw new Error("Missing wordsets")
        if(!('lessons' in res.body))   throw new Error("Missing lessons")
      });
})

//DELETE FAVOURITES
test('Should delete set from favourite set list',async () => {
    await request(app)
    .get('/delete-favourite/1')
    .set('authorization', good_token)
    .expect(200)
})

