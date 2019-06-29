var fs = require('fs');

function download(req, res, next) {
    try {
        const { fileId, path, metadataIsRequested, fileConfig } = res.locals;
        const { private: isPrivate, fileName, userId } = fileConfig;
        const fileMetadata = fs.readFileSync(`${path}/metadata.json`);
        const metadata = JSON.parse(fileMetadata);

        if (isPrivate === 'private') {
            console.log(`userId ${userId} is not permitted to download fileId:${fileId}, fileName:${fileName}`);
            next();
        }
        else if (metadataIsRequested) {
            res.download(`${path}/metadata.json`);
        }
        else if (metadata.deletedAt > 0) {
            console.log(`fileId:${fileId}, fileName:${fileName} of userId: ${userId} is deleted`);
            next();
        }
        else {
            res.download(`${path}/${fileName}`);
        }
    } catch (e) {
        next(e);
    }
}

module.exports = download;
