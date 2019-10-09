var express = require('express');
var app = express();
var mongoose =require('mongoose');
var bodyParser = require('body-parser')
require('dotenv/config');

// Set body parser
app.use(bodyParser.json());

//DBCONNECT
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

mongoose.connect(process.env.DBCON, 
  { useUnifiedTopology: true },
  () => console.log("Connected to database.")
);
var Schema = mongoose.Schema;
var eventSchema = new Schema ({
  event_name: {
    type: String,
    required: true
  },
  starting_date:  {
    type: Date,
    required: true,
    default: Date.now
  },
  ending_date:  {
    type: Date,
    required: false
  }
},{collection: "calendar", versionKey: false});

var Event = mongoose.model('eventModel', eventSchema);
module.exports = Event;

app.listen(3000, function () {
  console.log('Calendar app listening on port 3000!');
});

// ROOT
app.get('/', function (req, res) {
  res.send('Calendar!');
});

// CREATE NEW EVENT
app.get('/events', function (req, res) {
  Event.find({}, function (err, par) {
    if (err) throw err;
    res.send(par);
  })
});

// NEW EVENT
app.post('/new_event', function(req, res) {
  Event.insertMany({
    event_name: req.body.eventName,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date
  }, function (err, par){
    if(err) throw err;
    res.send(par)
  });
});

// DELETE EVENT
app.delete('/delete_event/:id', function (req, res) {
  console.log(req.params.id)
  Event.deleteOne({'_id' : req.params.id}, function (err,par){
    if(err) throw err;
    res.set('Access-Control-Allow-Origin','*');
    //res.send("Deleted "+ req.params.id)
    res.send(par)
  });
  
});

// GET SINGLE EVENT
app.get('/events/:id', function (req, res) {
  Event.find({'event_name':req.params.id}, function (err, par) {
    if (err) throw err;
    res.send(par);
  })
});

// UPDATE EVENT
app.put('/modify_event/:id', function (req, res) {
  var id = {'event_name' : req.params.id }
  var data = {event_name: req.body.eventName,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date}
  console.log(id+" & "+data)
  Event.updateOne(id, data, function(err, par) {
    if(err) throw err;
    res.send(par)
  })
});
