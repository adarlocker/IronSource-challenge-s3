var fs = require('fs');

function deleteController(req, res, next) {
    try {
        const { path, fileConfig } = res.locals;
        const { userId } = fileConfig;
        const queryUserId = req.query.userid;


        // userId = owner id
        if (userId !== queryUserId) {
            console.log(`userId ${queryUserId} is not permitted to delete this file, its owned by ${userId}`);
            next();
        }

        // update metadata file
        else {
            const metadataPath = `${path}/metadata.json`;
            const fileMetadata = fs.readFileSync(metadataPath);
            var metadata = JSON.parse(fileMetadata);
            metadata.deletedAt = Date.now();

            fs.writeFileSync(metadataPath, JSON.stringify(metadata));
            res.sendStatus(200);
        }
    } catch(e) {
        next(e);
    }
}

module.exports = deleteController;
