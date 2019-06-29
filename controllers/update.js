var fs = require('fs');

function update(req, res, next) {
    try {
        const { fileId, path, idToFileNamesMap, fileConfig } = res.locals;
        const { private: privateNewValue, userid: queryUserId } = req.query;

        const { userId, fileName } = fileConfig;

        const metadataPath = `${path}/metadata.json`;
        const fileMetadata = fs.readFileSync(metadataPath);
        var metadata = JSON.parse(fileMetadata);

        if (metadata.deletedAt > 0) {
            console.log(`fileId:${fileId}, fileName:${fileName} is deleted`);
            next();
        }

        // userId = file's owner id
        else if (userId !== queryUserId) {
            console.log(`userId ${userId} is not permitted to update fileId:${fileId}, fileName:${fileName}`);
            next();
        }

        else if (privateNewValue !== '0' && privateNewValue !== 'private') {
            console.log(`invalid attempt to update fileId:${fileId}, fileName:${fileName} with private value: ${privateNewValue}`);
            next();
        }

        else {
            fileConfig.private = privateNewValue;
            idToFileNamesMap[fileId] = fileConfig;

            // update files map
            const updatedFilesMap = JSON.stringify(idToFileNamesMap);
            fs.writeFileSync('./idToFileNames.json', updatedFilesMap);

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
