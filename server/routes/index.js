var express = require('express');
var router = express.Router();
var db = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
var con = db.createConnection({
  host:"localhost",
  user:"root",
  password:"harshilmaniar",
  database:"users"
});
var sql = "SELECT * FROM user_info";
router.get('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  con.query(sql,function(err,result){
    if(err) {
      throw err;
    }else{
      console.log(result);
      res.send( result);
    }
  });

  });

module.exports = router;
