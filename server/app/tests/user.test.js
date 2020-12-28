require('dotenv').config({path:'test.env'})
const express = require("express")
const serverRoutes = require("../build/routes/user")
const request = require("supertest")
const app = express()
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use('/user',serverRoutes)

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get sets created by user',async () => {
    await request(app)
    .get('/user/sets')
    .set('authorization', good_token)
    .send()
    .expect(200)
})

//REGISTER
test('Should not register, data error', async () => {
    await request(app)
        .post('/user/register')
        .send({
                user:{
                    "userInfo": {
                        "username": null,
                        "password": "test",
                        "email": "test@test.test",
                        "name": "Test",
                        "surname": "Test",
                        "birthday": "2010-10-10",
                        "idFirstLanguage": 1
                    },
                    "preferences": {
                        "idColorSets": 1,
                        "fontSize": null,
                        "noSound": null
                    }
                }
            }
        )
        .set('Content-Type', 'application/json')
        .expect(403)
})

test('Should not register, user exists', async () => {
    await request(app)
        .post('/user/register')
        .send(
            {
                user:{
                    "userInfo": {
                        "username": "cgrabowski",
                        "password": "test",
                        "email": "test@test.test",
                        "name": "Test",
                        "surname": "Test",
                        "birthday": "2010-10-10",
                        "idFirstLanguage": 1
                    },
                    "preferences": {
                        "idColorSets": 1,
                        "fontSize": null,
                        "noSound": null
                    }
                }
            }
        )
        .set('Content-Type', 'application/json')
        .expect(401)
})

//LOGIN
test('Should login', async () => {
    await request(app)
        .post('/user/login')
        .send(
            {
                'username': "cgrabowski",
                'password': "cgrabowski"
            }
        )
        .set('Content-Type', 'application/json')
        .expect(200)
})

test('Should login and return token', async () => {
    await request(app)
        .post('/user/login')
        .send(
            {
                'username': "cgrabowski",
                'password': "cgrabowski"
            }
        )
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
            if (!('accessToken' in res.body)) throw new Error("Missing token")
        });
})

test('Should not login wrong password or login', async () => {
    await request(app)
        .post('/user/login')
        .send(
            {
                'username': "cgrabowski1111",
                'password': "cgrabowski"
            }
        )
        .set('Content-Type', 'application/json')
        .expect(401)
})

test('Should not login user blocked', async () => {
    await request(app)
        .post('/user/login')
        .send(
            {
                'username': "testzablokowany",
                'password': "testzablokowany"
            }
        )
        .set('Content-Type', 'application/json')
        .expect(403)
})

test('Should not login no password or login', async () => {
    await request(app)
        .post('/user/login')
        .send()
        .set('Content-Type', 'application/json')
        .expect(403)
})

//ACCOUNT
test('Should return user info', async () => {
    await request(app)
        .get('/user/account')
        .set('authorization', good_token)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
            if (!('id' in res.body)) throw new Error("Missing id")
            if (!('username' in res.body)) throw new Error("Missing username")
            if (!('email' in res.body)) throw new Error("Missing email")
            if (!('name' in res.body)) throw new Error("Missing name")
            if (!('surname' in res.body)) throw new Error("Missing surname")
            if (!('birthday' in res.body)) throw new Error("Missing birthday")
            if (!('accountCreation' in res.body)) throw new Error("Missing accountCreation")
            if (!('idFirstLanguage' in res.body)) throw new Error("Missing idFirstLanguage")
            if (!('firstLanguage' in res.body)) throw new Error("Missing firstLanguage")
            if (!('preferences' in res.body)) throw new Error("Missing preferences")
        });
})

//ADD FAVOURITES
test('Should add set to favourite set list', async () => {
    await request(app)
        .get('/user/favourite/add/1')
        .set('authorization', good_token)
        .expect(200)
})

//FAVOURITES
test('Should get favourite set list', async () => {
    await request(app)
        .get('/user/favourite')
        .set('authorization', good_token)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
            if (res.body.lenght==0 ) throw new Error("Missing sets")
        });
})

//DELETE FAVOURITES
test('Should delete set from favourite set list', async () => {
    await request(app)
        .get('/user/favourite/delete/1')
        .set('authorization', good_token)
        .expect(200)
})

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"
var no_token = "Bearer"
var bad_token = "Bearer eaJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

//TOKEN 
test('Should authorize',async () => {
    await request(app)
    .get('/user/account')
    .set('authorization', good_token)
    .send()
    .expect(200)
})

test('Should not authorize no token',async () => {
    await request(app)
    .get('/user/account')
    .set('authorization', no_token)
    .send()
    .expect(401)
})

test('Should not authorize bad token',async () => {
    await request(app)
    .get('/user/account')
    .set('authorization', bad_token)
    .send()
    .expect(403)
})

// test('Should not authorize outdated token',async () => {
//     await request(app)
//     .get('/user/account')
//     .set('authorization', outdated_token)
//     .send()
//     .expect(403)
// })

test('Should not authorize no Authorize',async () => {
    await request(app)
    .get('/user/account')
    .send()
    .expect(401)
})