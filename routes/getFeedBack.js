var express = require('express');
var router = express.Router();
let ibmdb = require('ibm_db');


router.get('/', (req, res) => {
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

module.exports = router;