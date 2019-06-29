const TOKENS = { qAzef32F: 'user1AccessToken', hT9Lmdx: 'user2AccessToken' };

function isUserPermitted(req, res, next) {
    try {
        const { fileId, fileConfig, access_token } = res.locals;
        const { userId, fileName } = fileConfig;

        if (access_token !== TOKENS[userId]) {
            console.log(`userId ${userId} is not permitted to download fileId:${fileId}, fileName:${fileName}`);
            next('route');
        }
        else {
            next();
        }
    } catch (e) {
        next(e);
    }
}

module.exports = isUserPermitted;
