require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/user")
const request = require("supertest"); 
const app = express(); 
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(serverRoutes); 

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

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
    .expect((res) =>{
        
    }))
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

test('Should get favourite set list',async () => {
    await request(app)
    .get('/favourite')
    .set('authorization', good_token)
    .send()
    .expect(200)
})

test('Should get user information',async () => {
    await request(app)
    .get('/account')
    .set('authorization', good_token)
    .send()
    .expect(200)
})
