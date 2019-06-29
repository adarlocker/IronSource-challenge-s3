var fs = require('fs');

function download(req, res, next) {
    try {
        const { path, metadataIsRequested, fileConfig } = res.locals;
        const { private: isPrivate, fileName } = fileConfig;
        const fileMetadata = fs.readFileSync(`${path}/metadata.txt`);
        const metadata = JSON.parse(fileMetadata);

        if (isPrivate === 'private') {
            console.log('You are not permitted to download this file');
            next();
        }
        else if (metadataIsRequested) {
            res.download(`${path}/metadata.txt`);
        }
        else if (metadata.deletedAt > 0) {
            console.log('File is deleted');
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
