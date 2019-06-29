var express = require('express');
var router = express.Router();

var uploadController = require('../controllers/upload');
var downloadController = require('../controllers/download');
var updateController = require('../controllers/update');
var deleteController = require('../controllers/delete');
var downloadWithTokenController = require('../controllers/downloadWithToken');

var loadFileConfigurations = require('../middlewares/loadFileConfigurations');
var isUserPermitted = require('../middlewares/isUserPermitted');

var uploadFile = require('./uploadFileUtil');

router.post('/upload', uploadFile.single('file'), uploadController);
router.get('/download', loadFileConfigurations, downloadController);
router.get('/download/secure/:fileid', loadFileConfigurations, isUserPermitted, downloadWithTokenController);
router.put('/update', loadFileConfigurations, updateController);
router.delete('/delete', loadFileConfigurations, deleteController);

module.exports = router;
