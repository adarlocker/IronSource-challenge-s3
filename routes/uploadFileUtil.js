var fs = require('fs');
var multer  = require('multer');
var uniqueFilename = require('unique-filename');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileId = uniqueFilename('./', null, req.query.userid+file.originalname);
        const path = `./files/${req.query.userid}/${fileId}`;
        if (!fs.existsSync(path)) {
            fs.promises.mkdir(path).catch(console.error);
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
    });

var uploadFile = multer({ storage: storage });

module.exports = uploadFile;
