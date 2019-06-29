var fs = require('fs');
var uniqueFilename = require('unique-filename');

function loadFileConfigurations(req, res, next) {
    try {
        const userId = req.query.userid;
        const fileName = req.query.filename;
        const access_token = req.query.access_token;
        const metadataIsRequested = req.query.metadata === 'true';
        const fileId = req.params.fileid || uniqueFilename('./', null, userId + fileName);

        const idToFileNames = fs.readFileSync('./idToFileNames.json');
        const idToFileNamesMap = JSON.parse(idToFileNames);
        const fileConfig = idToFileNamesMap[fileId];
        if (!fileConfig) {
            console.log('File doesnt exists');
            next('route');
        }

        else {
            res.locals = {
                fileId,
                fileConfig,
                idToFileNamesMap,
                metadataIsRequested,
                access_token,
                path: `./files/${fileConfig.userId}/${fileId}`,
            };
            next();
        }

    } catch (e) {
        next(e);
    }
}

module.exports = loadFileConfigurations;
