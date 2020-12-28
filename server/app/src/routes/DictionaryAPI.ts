import express = require('express')
const router = express.Router();
import auth = require("../auth")
import common = require("../common")
var fs = require('fs');

var unirest = require("unirest");

//Translates text into one or more languages.
router.post('/translation',auth.authenticateToken, (req,res) => {
	console.log(req.query);
	var respo;
	if (req.query.translateToLang == undefined){
		res.status(400).json({error: "Translation language wasn't specified"})
	}
	if(req.query.translateFromLang == undefined){
		res.status(400).json({error: "Base language wasn't specified"})
	}
	if(req.query.word == undefined){
		res.status(400).json({error: "Word to translate wasn't specified"})
	}

	var req2 = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/translate");

	req2.query({
		"to": req.query.translateToLang,
		"api-version": "3.0",
		"from": req.query.translateFromLang,
		"profanityAction": "NoAction",
		"textType": "plain"
	});

	req2.headers({
		"content-type": "application/json",
		"x-rapidapi-key": "ae0508a806mshd10c94e12a2d09dp1b5ca2jsn995c41aaa822",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"useQueryString": true
	});

	req2.type("json");
	req2.send([
		{
			"Text": req.query.word
		}
	]);

	req2.end(function (res2:any) {
		if (res2.error) {
			res.status(400).json({error: "Couldn't receive response. Query failed"});
			throw new Error(res2.error);
		}
		respo = res2.body;
		console.log(res2.body);
		res.send(res2.body)
	});
	/*
	[
    	{
        	"translations": [
            	{
                	"text": "Hola",
                	"to": "es"
            	}
        	]
    	}
	]
	*/
})

//Gets the set of languages currently supported by other operations of the Translator Text API.
router.get('/Updatelanguages',auth.authenticateToken, (req,res) => {
	//var unirest = require("unirest");

	var req2 = unirest("GET", "https://microsoft-translator-text.p.rapidapi.com/languages");

	req2.query({
		"api-version": "3.0"
	});

	req2.headers({
		"x-rapidapi-key": "ae0508a806mshd10c94e12a2d09dp1b5ca2jsn995c41aaa822",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"useQueryString": true
	});


	req2.end(function (res2:any) {
		if (res2.error) {
			res2.status(400).json({error: "Couldn't receive response. Query failed"})
			throw new Error(res2.error);
		}
		console.log(res2.body);
		res.send(res2.body);
	});

})

//Identifies the language of a string of text.
router.post('/detect',auth.authenticateToken, (req,res) => {
	if (req.query.text == undefined){
		res.status(400).json({error: "There is no text to detect"})
	}

	var req2 = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/Detect");

	req2.query({
		"api-version": "3.0"
	});

	req2.headers({
		"content-type": "application/json",
		"x-rapidapi-key": "ae0508a806mshd10c94e12a2d09dp1b5ca2jsn995c41aaa822",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"useQueryString": true
	});

	req2.type("json");
	req2.send([
		{
			"Text": req.query.text
		}
	]);

	req2.end(function (res2:any) {
		if (res2.error) throw new Error(res2.error);
		console.log(res2.body);
		res.send(res2.body);
	});

})

//Transliterate from one language script to another
router.post('/transliterate',auth.authenticateToken, (req,res) => {

	if(req.query.fromScript == undefined)
	{
		res.status(400).json({error: "Base script not specified"})
	}
	if(req.query.language == undefined)
	{
		res.status(400).json({error: "Base language not specified"})
	}	
	if(req.query.toScript == undefined)
	{
		res.status(400).json({error: "Output script not specified"})
	}	
	if(req.body == undefined){
		res.status(400).json({error: "No text to transliterate"})
	}
	var req2 = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/transliterate");

	req2.query({
		"fromScript": req.query.fromScript,
		"api-version": "3.0",
		"language": req.query.language,
		"toScript": req.query.toScript
	});

	req2.headers({
		"content-type": "application/json",
		"x-rapidapi-key": "ae0508a806mshd10c94e12a2d09dp1b5ca2jsn995c41aaa822",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"useQueryString": true
	});

	req2.type("json");
	console.log(req.body);
	req2.send(req.body);
	/*
		{
			"Text": "こんにちは"
		},
		{
			"Text": "さようなら"
		}
	*/

	req2.end(function (res2:any) {
		if (res2.error) {
			res.status(400).json({error: "Response failed"});
			throw new Error(res2.error);
		}

		console.log(res2.body);
		res.send(res2.body);
	});
	//res.send("ok")
}) 

//Gives back examples of usage of a word in two languages
router.post('/examples',auth.authenticateToken, (req,res) => {


	var req2 = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/Dictionary/Examples");

	req2.query({
		"to": req.query.toLang,
		"from": req.query.fromLang,
		"api-version": "3.0"
	});

	req2.headers({
		"content-type": "application/json",
		"x-rapidapi-key": "ae0508a806mshd10c94e12a2d09dp1b5ca2jsn995c41aaa822",
		"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
		"useQueryString": true
	});

	req2.type("json");
	req2.send([
		{
			"Text": req.body.fromLangText,
			"Translation": req.body.toLangText,
		}
	]);

	req2.end(function (res2:any) {
		if (res2.error) {
			res.status(400).json({error: "Response failed"});
			throw new Error(res2.error);
		}

		console.log(res2.body);
		res.send(res2.body);
	});

})

router.post('/languageCode', auth.authenticateToken, (req,res) => {

	var langName:any;

	if (req.query.languageNameNative == undefined && req.query.languageNameEng == undefined){
		res.status(400).json({error: "Languages are not specified"})
	}
	if (req.query.languageNameNative == undefined){
		langName = req.query.languageNameEng;
	}
	else {
		langName = req.query.languageNameNative;
	}

	console.log(langName);
	fs.readFile('./languagesResponse.txt', 'utf8', function (err:any,data:any) {
		if (err) {
		  return console.log(err);
		}
		console.log(req.query.languageNameNative)
		let laanguages = JSON.parse(data);
		Object.entries(laanguages.translation).forEach(function(value : any){
			
			if(value[1].nativeName == langName || value[1].name == langName){
				console.log(value);
				res.send({"lang": value[0]});
			}
		}); 
	})
});

module.exports = router