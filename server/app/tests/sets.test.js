require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/sets")
const request = require("supertest")
const app = express()
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(serverRoutes)

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get sets created by user',async () => {
    await request(app)
    .get('/my-sets')
    .set('authorization', good_token)
    .send()
    .expect(200)
})

test('Should get set',async () => {
    await request(app)
    .get('/set/1')
    .set('authorization', good_token)
    .send()
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('setInfo' in res.body))   throw new Error("Missing setInfo")
        if(!('exercises' in res.body))   throw new Error("Missing exercises")
      })
})

test('Should not get set',async () => {
    await request(app)
    .get('/set/0')
    .set('authorization', good_token)
    .send()
    .expect(404)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('error' in res.body))   throw new Error("Missing error")
      })
})