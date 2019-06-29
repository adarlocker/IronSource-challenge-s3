var fs = require('fs');

function update(req, res, next) {
    try {
        const { fileId, path, idToFileNamesMap, fileConfig } = res.locals;
        const { private: privateNewValue, userid: queryUserId } = req.query;

        const { userId } = fileConfig;

        const metadataPath = `${path}/metadata.txt`;
        const fileMetadata = fs.readFileSync(metadataPath);
        var metadata = JSON.parse(fileMetadata);

        if (metadata.deletedAt > 0) {
            console.log('File is deleted');
            next();
        }

        // userId = file's owner id
        else if (userId !== queryUserId) {
            console.log('You are not permitted to update this file');
            next();
        }

        else if (privateNewValue !== '0' && privateNewValue !== 'private') {
            console.log(`private value can be '0' or 'private' only`);
            next();
        }

        else {
            fileConfig.private = privateNewValue;
            idToFileNamesMap[fileId] = fileConfig;

            // update files map
            const updatedFilesMap = JSON.stringify(idToFileNamesMap);
            fs.writeFileSync('./idToFileNames.txt', updatedFilesMap);

            //update file updatedAt field
            metadata.updatedAt = Date.now();
            const updatedMetadata = JSON.stringify(metadata);
            fs.writeFileSync(metadataPath, updatedMetadata);

            res.sendStatus(200);
        }

    } catch(e) {
        next(e);
    }
}

module.exports = update;
