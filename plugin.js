module.exports.requestHooks = [
    require('./src/crypto/encrypt-request-hook')
];

module.exports.responseHooks = [
    require('./src/crypto/decrypt-response-hook')
];

module.exports.templateTags = [
    require('./src/otp-ref-id-generator')
]