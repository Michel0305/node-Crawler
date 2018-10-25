var express = require('express');
var router = express.Router();

var reqData = require('../template/requestUrl');

/* GET home page. */
router.get('/', function(req, res, next) {
    let tmp = reqData.getreqData();
  console.log(tmp);
});

module.exports = router;
