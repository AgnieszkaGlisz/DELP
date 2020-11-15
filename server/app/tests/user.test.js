require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/user")
const request = require("supertest"); 
const app = express(); 

const dad = require("../build/routes/basic")
app.use(serverRoutes); 
app.use(dad); 


var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get api info',async () => {
    await request(app).get('/apiinfo').send()
    .expect(200)
})

test('Should login',async () => {
    await request(app)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send(
        {
            'username': "cgrabowski",
            'password': "cgrabowski"
        }
    )
    .expect(200)
})

test('Should not login',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            username: "testzablokowany",
            password: "testzablokowany"
        }
    )
    .expect(403)
})

test('Should not login',async () => {
    await request(app)
    .post('/login')
    .send(
        {
            username: "abcd",
            password: "aaaa"
        }
    )
    .expect(403)
})