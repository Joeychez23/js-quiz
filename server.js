const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const scores = require('./scores.js');
require('dotenv');

const port = process.env.PORT || 3000;
const username = 'mydb'
const password = 'test123'
const cluster = 'Clustor0';
const dbname = 'scorestore';
const uri = `mongodb+srv://mydb:testval@Cluster0.haknbyf.mongodb.net/scorestore?retryWrites=true&w=majority`
//console.log(uri);
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
console.log("START");


//connects to database
async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    console.log("connected")
  } catch (error) {
    console.error(error);

  }
}

connect();




app.listen(port);
console.log(`listening at port: ${port}`);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  //res.send("Hello World");
});











app.get('/scores', function(req, res) {
    let nameCheck = 0;
    const newscore = new scores({
      Name: 'Joseph Sanchez',
      Score: '90'
    })
  
    scores.find((err, foundItem) => {
      if(err) {
        console.log(err);
      } else {
    
        for(let i = 0; i < foundItem.length; i++) {
          if(foundItem[i].Name != newscore.Name) {
            nameCheck += 1;
  
          }
        }
        if(nameCheck == foundItem.length) {
          newscore.save().then((result) => {
            //console.log(nameCheck);
            console.log(foundItem.length);
            res.json(foundItem);
          }).catch((err) => {
            console.log(err);
          })     
        }
        else {
          //console.log(nameCheck);
          //console.log(foundItem.length);
          console.log(`name's taken`);
          res.json(foundItem);
  
        }
      }
    })
})
  
  
  
  
