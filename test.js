var express = require('express');
var router = express.Router();
var ibmdb = require('ibm_db');
var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

// ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
//       function (err, conn) {
//         console.log("db connection");
//         if (err) return console.log(err);
//         conn.query(" SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE USERFUL='Y') *100.0/ Count (*)),2) as decimal(10,2))AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE USERFUL='N') *100.0/ Count (*)),2) as decimal(10,2))AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK ;", function (err, data) {
//           if (err) console.log(err);
//           else console.log(data);
//         //   res.send(data);
//           conn.close(function () {
//             console.log('done');
//           });
//     });
// });

// router.get('/', (req, res) => { 
//   ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
//       function (err, conn) {
//         console.log("db connection");
//         console.log(req.query.begindate);
//         // console.log ;
//         //console.log('body: ' + JSON.stringify(req.body));
//         // var begindate = query.begindate;
//         // var enddate = query.enddate;
//         // console.log("SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '" + begindate + "' AND '" + enddate + "';");
//         // var sql = "SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '" + begindate + "' AND '" + enddate + "';";
//         //var sql ="SELECT cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Positive,cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '2019-04-01' and '2019-04-05'";
//         // if (err) return console.log(err);
//         // conn.query(sql, function (err, data) {
//           // if (err) console.log(err);
//           // else console.log(data);
//           // res.send(data);
//           conn.close(function () {
//             console.log('done');
//           });
//         // });
//     });
// });
// ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
//       function (err, conn) {
//         console.log("db connection");
//         console.log(req.query.begindate);
//         // console.log ;
//         //console.log('body: ' + JSON.stringify(req.body));
//         // var begindate = query.begindate;
//         // var enddate = query.enddate;
//         // console.log("SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '" + begindate + "' AND '" + enddate + "';");
//         // var sql = "SELECT cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Positive,cast(round(((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '" + begindate + "' AND '" + enddate + "')) *100.0/ Count (*)),2) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '" + begindate + "' AND '" + enddate + "';";
//         //var sql ="SELECT cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='Y') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Positive,cast((SELECT count(*) FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK WHERE (USERFUL='N') and (ASK_DATE between '2019-04-01' and '2019-04-05')) *100/ Count (*) as decimal(10,2)) AS Negative FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK  where ASK_DATE between '2019-04-01' and '2019-04-05'";
//         // if (err) return console.log(err);
//         // conn.query(sql, function (err, data) {
//           // if (err) console.log(err);
//           // else console.log(data);
//           // res.send(data);
//           conn.close(function () {
//             console.log('done');
//           });
//         // });
//     });


ibmdb.open("DATABASE = BLUDB; HOSTNAME = dashdb-txn-flex-yp-dal10-628.services.dal.bluemix.net; PORT = 50000; PROTOCOL = TCPIP; UID = bluadmin; PWD = MzI3ZWNkNzM2Njky; ",
      function (err, conn) {
        console.log("db connection");
        if (err) return console.log(err);
        conn.query("SELECT * FROM INTERNAL_FEEDBACK.THUMBS_FEEDBACK", function (err, data) {
          if (err) console.log(err);
          else console.log(data);
          // var obj= JSON.stringify(data);
          // res.send(obj);
        //   res.send(data);
          conn.close(function () {
            console.log('done');
          });
        });
      });