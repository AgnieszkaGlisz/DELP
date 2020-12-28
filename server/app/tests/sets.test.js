require('dotenv').config({path:'test.env'})
const express = require("express")
const serverRoutes = require("../build/routes/sets")
const request = require("supertest")
const app = express()
const cors = require('cors')
app.use(cors({origin:"*"}))
app.use(express.json())
app.use('/sets',serverRoutes)

var good_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjZ3JhYm93c2tpIiwiaWF0IjoxNjA1MjE2NTI0fQ.4OXehw3gBqpkx7boTY_AKc63QFDZOGDNsg0wSJhy_hA"

test('Should get set',async () => {
    await request(app)
    .get('/sets/1')
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
    .get('/sets/0')
    .set('authorization', good_token)
    .send()
    .expect(404)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) =>{
        if(!('error' in res.body))   throw new Error("Missing error")
      })
})

function createSqlForSets(wordsToFind,deaf,blind,page,langfrom,langto){
  if(!wordsToFind) wordsToFind=""
  if(!deaf) deaf=false
  if(!blind) blind=false
  if(!page) page=0
  if(!langfrom) langfrom=0
  if(!langto) langto=0
  var limit = 20 
  var offset = 20 * page
  var sql = 'SELECT es.*, u.username FROM `ExerciseSets` es,`Users` u '
  sql += 'WHERE u.id = es.idCreator AND (es.deleted = 0 OR es.deleted is null) '
  if(langfrom>0 && langto>0)  sql+= ' AND ((es.idBaseLanguage= '+langfrom + ' AND es.idLearnLanguage= '+langto+') OR (es.idBaseLanguage= '+langto + ' AND es.idLearnLanguage= '+langto+')) '
  else if(langfrom>0)  sql+= ' AND es.idBaseLanguage = '+langfrom
  for(var i = 0;i<wordsToFind.length;i++){
      if(i==0){
          sql+= ' AND (es.name LIKE "' + wordsToFind[i] + '%"'
      }
      else{
          sql+= ' OR es.name LIKE "' + wordsToFind[i] + '%"'
      }
  }
  if(wordsToFind.length) sql+= ')' 
  sql+= ' ORDER BY '
  if (blind) sql+= ' es.ifAudio DESC,'
  if (deaf) sql+= ' es.ifVideo DESC,'
  sql += ' es.popularity DESC, es.ifPicture DESC'
  sql += ' LIMIT ' + limit + ' OFFSET ' + offset
  return sql
}
sqlresultgood1 = "SELECT es.*, u.username FROM `ExerciseSets` es,`Users` u WHERE u.id = es.idCreator AND (es.deleted = 0 OR es.deleted is null)  AND ((es.idBaseLanguage= 1 AND es.idLearnLanguage= 2) OR (es.idBaseLanguage= 2 AND es.idLearnLanguage= 2))  AND (es.name LIKE \"w%\" OR es.name LIKE \"o%\" OR es.name LIKE \"r%\" OR es.name LIKE \"d%\") ORDER BY  es.popularity DESC, es.ifPicture DESC LIMIT 20 OFFSET 0" 
sqlresultgood = "SELECT es.*, u.username FROM `ExerciseSets` es,`Users` u WHERE u.id = es.idCreator AND (es.deleted = 0 OR es.deleted is null)  ORDER BY  es.popularity DESC, es.ifPicture DESC LIMIT 20 OFFSET 0"

test("Should return working sql", function() {
  expect(createSqlForSets("word",0,0,0,1,2))
  .toBe(sqlresultgood1);
});
test("Should return working sql", function() {
  expect(createSqlForSets(undefined,undefined,undefined,undefined,undefined,undefined))
  .toBe(sqlresultgood);
});