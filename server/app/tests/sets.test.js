require('dotenv').config()
const express = require("express")
const serverRoutes = require("../build/routes/sets")
const request = require("supertest"); 
const app = express(); 
app.use(serverRoutes); 

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get sets created by user',async () => {
    await request(app)
    .get('/my-sets')
    .set('authorization', good_token)
    .send()
    .expect(200)
})