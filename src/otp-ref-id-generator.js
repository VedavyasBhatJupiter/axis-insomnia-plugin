module.exports = {
    name: 'otpRefIdGenerator',
    displayName: 'Axis OTP Reference ID',
    description: 'Generate Axis Compliant OTP Reference ID',
    args: [],
    async run (context) {
        const crypto = require("crypto");
        return crypto.randomBytes(8).toString('hex');
    }
};