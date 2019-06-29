const TOKENS = { qAzef32F: 'user1AccessToken', hT9Lmdx: 'user2AccessToken' };

function isUserPermitted(req, res, next) {
    try {
        const { fileConfig, access_token } = res.locals;
        const { userId } = fileConfig;

        if (access_token !== TOKENS[userId]) {
            console.log('You are not permitted to download this file');
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
