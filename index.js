var express= require('express');
var router= express.Router();
var bodyParser = require('body-parser');
var http= require('http');
var ibmdb= require('ibm_db');
var app = express();
var $ = require('jQuery');
var jsdom = require('jsdom');
var fs = require('fs');
$ = require('jquery')(new jsdom.JSDOM().window);


router.get('/', function(req, res, next) {
	
	res.render('./gui');
});

http.createServer(function (req, res){
//   if(req.url === "/"){
//     fs.readFile("./public/gui.html", "UTF-8", function(err, html){
//       res.writeHead(200, {"Content-Type": "text/html"});
//       res.end(html);
//   });
//   }else if(req.url.match("\.css$")){
//   var cssPath = path.join(__dirname, 'public', req.url);
//   var fileStream = fs.createReadStream(cssPath, "UTF-8");
//   res.writeHead(200, {"Content-Type": "text/css"});
//   fileStream.pipe(res);
//   }
//   else{
//     res.writeHead(404, {"Content-Type": "text/html"});
//     res.end("No Page Found");
// }

});
console.log('Creating the http server');
// var connString = "DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; "

// ibmdb.open(connString,
//     function(err, conn) {
//     console.log("db connection");
//     if (err) return console.log(err);
//     conn.query("SELECT INTENT_NAME, USERFUL from INTERNAL_FEEDBACK.THUMBS_FEEDBACK where USERFUL='Y'")
//     conn.close(function () {
//         console.log('done');
//     });
// });

// function positiveFeedBack(res){
//   console.log("enter into PF");
//   $(".PositiveFeedBackValue").html("30");
//   console.log("exit from PF");

// }
// function executeQuery(err,data){
//   if (err) console.log(err);
//   else console.log(data);
// }
// function  fetchData(res){
//   executeQuery("SELECT * from INTERNAL_FEEDBACK.THUMBS_FEEDBACK where USERFUL='Y'",function(result){
//     console.log(result);
//     res.write('<table><tr>');
//     for(var column in result[0]){
//       res.write('<td><label>'+column+'</label></td>');
//       res.write('</tr>');
//     }
//     for(var row in result) {
//       res.write('<tr>');
//       for(var column in result[row]){
//         res.write('<td><label>'+result[row][column]+'</label></td>');
//       }
//     res.write('</tr>');
//   }
//   res.end('</table>');
//   });
// }

app.use(bodyParser.urlencoded({  //   body-parser to
  extended: true                 //   parse data
}));                             //
app.use(bodyParser.json());      //

app.get('/', (req, res) => {
 // positiveFeedBack(res);
  //var name = 'hello';
  console.log("entered into html file ");
  res.sendFile(__dirname +'/gui.html');
})
app.get('/Feedbackvalue', (req, res) => {
  console.log("entered into Feedbackvalue method");
  ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
  function (err, conn) {
  console.log("db connection");
  console.log(req.query.SchemaName);
  var schema = req.query.SchemaName;
  if(schema == "1") //Internal Schema
{
  console.log("SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') ) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive, cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') )*100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y'))AS Total,(SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N')) AS TotalN FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK;");
  var sql ="SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') ) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive, cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') )*100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y'))AS Total,(SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N')) AS TotalN FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK;";
  
}
else if (schema == "2")
{
  console.log("SELECT cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y') ) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive, cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N') )*100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y'))AS Total,(SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N')) AS TotalN FROM EXTERNAL_FEEDBACK.FEEDBACK;");
  var sql ="SELECT cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y') ) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive, cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N') )*100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y'))AS Total,(SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N')) AS TotalN FROM EXTERNAL_FEEDBACK.FEEDBACK;";
  

}
  if (err) return console.log(err);
      conn.query(sql, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
      res.send(data);
      conn.close(function () {
          console.log('done');
      });
  });
});
});

app.get('/getFeedBack', (req, res) => {
  console.log("entered into getFeedback method");
  ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
  function (err, conn) {
  console.log("db connection");
  console.log(req.query.begindate);
  console.log(req.query.enddate);
  //console.log('body: ' + JSON.stringify(req.body));
  var begindate =req.query.begindate;
  var enddate = req.query.enddate;
  var schema = req.query.SchemaName;
  if(schema == "1") //Internal Schema
{
  console.log("SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';");
  var sql ="SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"'))AS Total,(SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) AS TotalN FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';";
  
}
else if (schema == "2")
{
  console.log("SELECT cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM EXTERNAL_FEEDBACK.FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';");
  var sql ="SELECT cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative, (SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='Y') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"'))AS Total,(SELECT count(*) FROM EXTERNAL_FEEDBACK.FEEDBACK WHERE (USEFUL='N') and (ASK_DATE between '"+begindate +"' AND '"+enddate+"')) AS TotalN FROM EXTERNAL_FEEDBACK.FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';";
  

}
 //var sql ="SELECT cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Positive,cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '2019-04-01' and '2019-04-05'";
  if (err) return console.log(err);
      conn.query(sql, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
      res.send(data);
      conn.close(function () {
          console.log('done');
      });
  });
});
});


app.get('/getTableResponse', (req, res) => {
  console.log("entered into getTableResponse method");
  ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
  function (err, conn) {
  console.log("db connection");
  console.log(req.query.begindate);
  console.log(req.query.enddate);
  var begindate =req.query.begindate;
  var enddate = req.query.enddate;
  var schema = req.query.SchemaName;
  if(schema == "1") //Internal Schema
{
  console.log(" SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';");
  var sql ="SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';";
  
}
else if (schema == "2")//External Schema
{
  console.log(" SELECT * FROM EXTERNAL_FEEDBACK.FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';");
  var sql ="SELECT * FROM EXTERNAL_FEEDBACK.FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';";

}
  // console.log(" SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';");
  // var sql ="SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '"+begindate +"' AND '"+enddate+"';";
  if (err) return console.log(err);
      conn.query(sql, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
      res.send(data);
      conn.close(function () {
          console.log('done');
      });
  });
});
});


app.get('/tblBodyResponse', (req, res) => {
  console.log("entered into tblBodyResponse method");
  ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
  function (err, conn) {
  console.log("db connection");
  console.log(req.query.SchemaName);
  var schema = req.query.SchemaName;
  if(schema == "1") //Internal Schema
{
  console.log("SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK;");
  var sql ="SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK;";
  
}
else if (schema == "2") //External schema
{
  console.log("SELECT * FROM EXTERNAL_FEEDBACK.FEEDBACK;");
  var sql ="SELECT * FROM EXTERNAL_FEEDBACK.FEEDBACK;";
  

}
if (err) return console.log(err);
conn.query(sql, function (err, data) {
if (err) console.log(err);
else console.log(data);
res.send(data);
conn.close(function () {
    console.log('done');
});
});
});
});

// app.post('/data', (req, res) => {
//   console.log("entered into post method")
//   res.sendStatus("300");
// });
app.listen(3000,function(){
  console.log('connected to port 3000');
})
module.exports = router;