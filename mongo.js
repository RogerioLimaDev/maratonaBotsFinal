/* jshint esversion:6 */

var MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

// Connection URL
var pt1 = 'mongodb://cosmosmaratona:';
var pass = 'zVvXKWuh8NAx0nP7E4UE6oTqVvXrMhOKrROIemHOGDsIqyOnOTBpgQYVLOYAQubgQYVTSP42W5QlWJHGId34pA==';
var pt2 = encodeURIComponent(pass);
var pt3 = '@cosmosmaratona.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
var url = pt1 + pt2 + pt3;

var dbResult = false;

 var createCollection = function(collection){
    console.log(collection);
    MongoClient.connect(url , function(err, db) {          
          var dbo = db.db("clientes");
          dbo.createCollection (collection, function(err, res) {
            try {
              console.log('Is conneted = '+ db.isConnected());
              // // if (err) throw err;
              console.log("Collection created!");
              db.close();              
            }

            catch (error) {
              console.log('Este foi o erro: '+ err); 
            }
          });         
        });
    };

var insertDocument = function(data){

  MongoClient.connect(url , function(err, db) {
    try {
          console.log(data);

          if (err) throw err;
          var dbo = db.db("clientes");
          dbo.collection("empresa").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            console.log('Is conneted = '+db.isConnected());
            dbresult = true;
          });        

      } catch (error) {
          console.log('Este foi o erro: '+ err);
          dbresult = false;
      } 
  });
};

var DBResults = function()
{
  return dbresult;
}


var toSend = [];
var sendResults = function()
  {
    return toSend;
  };

var querytDocument = function(data){

  var query = {
    db : data.db,
    col: data.collection,
    name: data.name
  };

  MongoClient.connect(url , function(err, db) {
    try {
             var dbo = db.db(query.db);
              dbo.collection(query.col).findOne({nomeFantasia:query.name}, function(err, result) {
                  if(result === null)
                  {
                    console.log('Esta empresa ainda não está cadastrada');
                    var errMsg = ['Nenhum resultado encontrado'];
                    toSend.push(errMsg);
                    return;}
                  
                  toSend.push(result.nomeFantasia);
                  toSend.push(result.cnpj);
                  toSend.push(result.valor);
                  toSend.push(result.dataVencimento);
                  toSend.push(result.emailResp);
                  console.log('results retrieved');
                  db.close();
                  if(db.isConnected()===false){
                    console.log('DATABASE IS CLOSED');
                  }
              });           
        } 
     catch (error) 
        {
          console.log('Este foi o erro: '+ err);
          db.close();
          console.log('Is conneted = '+db.isConnected());       
        }
    });
  };
  

exports.createCollection = createCollection;
exports.insertDocument = insertDocument;
exports.querytDocument = querytDocument;
exports.sendResults = sendResults;
exports.DBResults = DBResults;