import express = require('express')
const router = express.Router();
import {db} from '../database'
import auth = require("../auth")
import common = require("../common")

var unirest = require("unirest");

//Translates text into one or more languages.
router.post('/translation', (req,res) => {
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
router.get('/languages', (req,res) => {
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
router.post('/detect', (req,res) => {
	if (req.query.text == undefined){
		res.status(400).json({error: "There is no text to detect"})
	}

	//var unirest = require("unirest");

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

router.post('/transliterate', (req,res) => {
	
}) 

module.exports = router