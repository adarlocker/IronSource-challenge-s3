var fs = require('fs');
var uniqueFilename = require('unique-filename');

function upload(req, res, next) {
    try {
        const fileName = req.file.originalname;
        const userId = req.query.userid;
        const fileSize = req.file.size;
        const fileId = uniqueFilename('./', null, userId + fileName);
        const path = `files/${userId}/${fileId}`;

        // update files map
        const idToFileNames = fs.readFileSync('./idToFileNames.json');
        var idToFileNamesMap = JSON.parse(idToFileNames);

        // if file is not set specifically to be 'private' -> set it by default to public (0)
        idToFileNamesMap[fileId] = { fileName, userId, private: req.query.private === 'private' ? 'private' : 0 };
        fs.writeFileSync('./idToFileNames.json', JSON.stringify(idToFileNamesMap));

        // create file metadata
        const currentTime = Date.now();
        fs.writeFileSync(`${path}/metadata.json`, JSON.stringify({
            fileName,
            fileSize, // file size in bytes
            createdAt: currentTime,
            updatedAt: currentTime,
        }));

        res.sendStatus(200);

    } catch(e) {
        next(e);
    }
}

module.exports = upload;
