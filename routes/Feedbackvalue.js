var express = require('express');
var router = express.Router();
let ibmdb = require('ibm_db');

router.get('/', (req, res) => {
    console.log("entered into FeedbackValue method");
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


module.exports = router;