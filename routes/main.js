var express = require('express');
var router = express.Router();

var getHtmlClass = require('../template/requestUrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  let a = getHtmlClass.getbodyData();
  console.log("tmp");
});

module.exports = router;
