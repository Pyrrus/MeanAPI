// MEAN Stack RESTful API Tutorial - attack List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('attacklist', ['attacklist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/attacklist', function (req, res) {
  console.log('I received a GET request');

  db.attacklist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/attacklist', function (req, res) {
  console.log(req.body);
  db.attacklist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/attacklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.attacklist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/attacklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.attacklist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/attacklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.attacklist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, damage: req.body.damage, des: req.body.des, type: req.body.type}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");