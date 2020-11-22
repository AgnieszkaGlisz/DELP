require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/basic")
const request = require("supertest"); 
const app = express(); 
app.use(serverRoutes); 

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"
var no_token = "Bearer"
var bad_token = "Bearer eaJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get api info',async () => {
    await request(app)
    .get('/apiinfo')
    .send()
    .expect(200)
})

test('Should get languages list',async () => {
    await request(app)
    .get('/languages')
    .set('authorization', good_token)
    .send()
    .expect(200)
    .expect((res) =>{
        if(!('languages' in res.body))   throw new Error("Missing languages")
        
      });
})

test('Should authorize',async () => {
    await request(app)
    .get('/languages')
    .set('authorization', good_token)
    .send()
    .expect(200)
})

test('Should not authorize',async () => {
    await request(app)
    .get('/languages')
    .set('authorization', no_token)
    .send()
    .expect(401)
})

test('Should not authorize',async () => {
    await request(app)
    .get('/languages')
    .set('authorization', bad_token)
    .send()
    .expect(403)
})

test('Should not authorize',async () => {
    await request(app)
    .get('/languages')
    .send()
    .expect(401)
})

test('Should get language info',async () => {
    await request(app)
    .get('/languageinfo/1')
    .set('authorization', good_token)
    .send()
    .expect(200)
    .expect((res) =>{
        if(!('id' in res.body))   throw new Error("Missing id")
        if(!('code' in res.body))   throw new Error("Missing code")
        if(!('name' in res.body))   throw new Error("Missing name")
        if(!('info' in res.body))   throw new Error("Missing info")
      })
})

test('Should not get language info',async () => {
    await request(app)
        .get('/languageinfo/0')
        .set('Authorization', good_token)
        .send()
        .expect(404)
})

test('Should get prepered response for all bad routes',async () => {
    await request(app)
        .get('/badroute')
        .set('Authorization', good_token)
        .send()
        .expect(404)
        .expect((res) =>{
            if(!('error' in res.body))   throw new Error("Missing error")
          })
})







  