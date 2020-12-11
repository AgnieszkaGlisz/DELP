require('dotenv').config({path:'test.env'})
const express = require("express")
const request = require("supertest"); 
const {app} = require("../build/app.js")


var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

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







  