const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const bbdd='Prueba'
const coleccion='Personas'

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});

/*
app.post('/mostrar', urlencodedParser, (req, res) => {
  //Obtener datos del primer elemento dentro de una coleccion
  MongoClient.connect(url+bbdd, function(err, db) {
      if (err) throw err;
      var dbo = db.db(bbdd);
      dbo.collection(coleccion).find({}, function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
  });
*/    

/////////////////////leer item en documento///////////////////////////////////
app.post('/mostrar', urlencodedParser, (req, res) => {
    MongoClient.connect(url+bbdd, function(err, db) {
        if (err) throw err;
        var dbo = db.db(bbdd);
        let filtro = { "nombre": req.body.nombre};
        dbo.collection(coleccion).find(filtro).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
    res.send(req.body);
    
});

////////////////actualizar/////////////////////////////////

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(bbdd);
  var filtro = { "nombre": req.body.nombre };
  var newvalues = { $set: {"nombre": req.body.nombre,"telefono":req.body.telf, "email":req.body.email } };
  dbo.collection(coleccion).updateOne(myquery, newvalues, function(err, res) {
  if (err) throw err;
  console.log("Documento actualizado");
  db.close();
  });
});

 ////////////////////////////Borrar  ////////////////////////////
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(bbdd);
  var filtro = { "nombre":  req.body.nombre  };
  dbo.collection(coleccion).deleteOne(filtro, function(err, obj) {
  if (err) throw err;
  console.log("Documento borrado");
  db.close();
  });
});

app.listen(3000);