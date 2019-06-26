var express = require('express');
var router = express.Router();
let ibmdb = require('ibm_db');

router.get('/', (req, res) => {
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
           console.log(data);
          res.send(data);
          conn.close(function () {
            console.log('done');
      });
  });
});
  });




module.exports = router;