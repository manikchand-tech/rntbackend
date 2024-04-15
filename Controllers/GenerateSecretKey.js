const crypto = require('crypto');

let secretKey;

const generateSecretKey = () => {
    if (!secretKey) {
        secretKey = crypto.randomBytes(32).toString('hex');
        console.log('Generated secret key:', secretKey);
    }
    return secretKey;
};

module.exports = generateSecretKey();