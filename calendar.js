var express = require('express');
var app = express();
var mongoose =require('mongoose');
var bodyParser = require('body-parser')
require('dotenv/config');

// import routes
const postsRoute = require('./routes/posts')
app.use('/', postsRoute);

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
  console.log('Example app listening on port 3000!');
});

// ROOT
app.get('/', function (req, res) {
  res.send('Calendar!');
});

// CREATE NEW EVENT
app.get('/events', function (req, res) {
  Event.find({}, function (err, par) {
    if (err) throw err;
    console.log(par);
    res.send(par);
  })
});

// NEW EVENT
app.post('/new_event', function(request, response) {
  var targetEvent = req.params.id
  Event.insertMany({
    event_name: request.body.eventName,
    starting_date: request.body.starting_date,
    ending_date: request.body.ending_date
  });
  response.send('Inserted '+ targetEvent);
});

// DELETE EVENT
app.delete('/delete_event/:id', function (req, res) {
  console.log(req.params.id);
  var targetEvent = req.params.id
  Event.deleteOne({'event_name' : targetEvent}, function (err){
    if(err) throw err;
  });
  
  res.set('Access-Control-Allow-Origin','*');
  res.send("Deleted "+ targetEvent)

});

app.put('/modify_event', function (req, res) {
  res.send('Modify event!');
});
//asd