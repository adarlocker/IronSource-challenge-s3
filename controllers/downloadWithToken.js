var fs = require('fs');

function downloadWithToken(req, res, next) {
    try {
        const { fileId, path, metadataIsRequested, fileConfig } = res.locals;
        const { fileName } = fileConfig;
        const fileMetadata = fs.readFileSync(`${path}/metadata.json`);
        const metadata = JSON.parse(fileMetadata);

        if (metadataIsRequested) {
            res.download(`${path}/metadata.json`);
        }
        else if (metadata.deletedAt > 0) {
            console.log(`fileId:${fileId}, fileName:${fileName} is deleted`);
            next();
        }
        else {
            res.download(`${path}/${fileName}`);
        }
    } catch (e) {
        next(e);
    }
}

module.exports = downloadWithToken;
