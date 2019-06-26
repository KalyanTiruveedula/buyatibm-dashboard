var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // positiveFeedBack(res);
   //var name = 'hello';
   console.log("entered into html file ");
   res.render('gui.html');
});






module.exports = router;
