const express = require('express')
const mysql = require('mysql')

const scrapers = require('./scrapers.js');
//Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'top3guarantee',
    database : 'fallguys'
});

//Connect to DB

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('database connection successful.');
});


const app = express();

//Create DB 
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE fallguys';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database creation successful.');
    });
});

/*
ROUNDS TABLE:

THE ROUNDS TABLE GETS ITS DATA FROM THE FALLGUYS WIKI

/////////////////////////////////
COLUMNS: 

ROUND TITLE
ROUND TYPE
ROUND OBJECTIVE
HOW-TO PLAY
# PARTICIPANTS
QUALIFICATION (AS A PERCENTAGE OF # PARTICIPANTS)
DATE ROUND WAS ADDED INTO GAME

/////////////////////////////////
FUTURE IMPLEMENTATIONS:
AUTO-UPDATE TABLE -- STATUS: NOT STARTED
FIX DATATYPES     -- STATUS: NOT STARTED

*/

//create rounds table//
app.get('/createtable-rounds', (req,res) => {
    let sql = 'CREATE Table rounds (roundID int AUTO_INCREMENT, title VARCHAR(255), rdtype VARCHAR(255), objective VARCHAR(255), howto VARCHAR(255), participants VARCHAR(255), qualification VARCHAR(255), addedIn VARCHAR(255), PRIMARY KEY (roundID))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table - Rounds:  creation successful')
    });
});


//insert rounds into rounds table//
app.get('/insert-rounds', async (req,res) => {
    let sql = "INSERT INTO rounds (title, rdtype, objective, howto, participants, qualification, addedIn) VALUES ?";

    let values = await scrapers.scrapeTable('https://fallguysultimateknockout.fandom.com/wiki/Rounds')

    db.query(sql, [values], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table-Rounds: Rows successfully Inserted.')
    });
});

/*
RECORDS TABLE:



*/

//RECORDS TABLE//
app.get('/createtable-records', (req,res) => {
    let sql = 'CREATE Table records (roundID int AUTO_INCREMENT, addedIn VARCHAR(255), PRIMARY KEY (roundID))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table - Rounds:  creation successful')
    });
});



app.listen('3000',() => {
    console.log('Server started on port 3000');
});
