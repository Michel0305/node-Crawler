var express = require('express');
var router = express.Router();

var getHtmlClass = require('../template/requestUrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  getHtmlClass.getGwniusbody((drData)=>{
    console.log(drData);
  })
});

module.exports = router;
