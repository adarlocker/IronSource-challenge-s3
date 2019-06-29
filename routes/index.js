var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('IronSource challenge S3');
});

module.exports = router;
