require('dotenv').config({path:'test.env'})
const express = require("express")
const serverRoutes = require("../build/routes/basic")
const request = require("supertest"); 
const app = express()
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use('/api',serverRoutes)


test('Should get api info',async () => {
    await request(app)
    .get('/api/info')
    .send()
    .expect(200)
})

test('Should get languages list',async () => {
    await request(app)
    .get('/api/languages')
    .send()
    .expect(200)
    .expect((res) =>{
        if(!('languages' in res.body))   throw new Error("Missing languages")
        
      });
})



test('Should get language info',async () => {
    await request(app)
    .get('/api/languageinfo/1')
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
        .get('/api/languageinfo/0')
        .send()
        .expect(404)
})









  