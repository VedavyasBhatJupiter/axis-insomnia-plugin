const crypto = require('crypto');

class AxisCrypto {
    constructor(secret) {
        let parts = []
        for (let i = 0; i < secret.length / 2; i++) {
            parts.push(parseInt(secret.substring(i * 2, i * 2 + 2), 16))
        }
        this.key = Buffer(parts)
    }

    encrypt(plainText) {
        //const iv = crypto.randomBytes(16)
        const iv = Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        const cipher = crypto.createCipheriv('aes-128-cbc', this.key, iv);

        return Buffer.concat([iv, cipher.update(plainText, 'utf8'), cipher.final()]).toString('base64');
    };

    decrypt(messagebase64) {
        const messageBuf = Buffer.from(messagebase64, 'base64')
        const iv = messageBuf.slice(0, 16);
        const payload = messageBuf.slice(16, messageBuf.length)

        const decipher = crypto.createDecipheriv('aes-128-cbc', this.key, iv);

        return Buffer.concat([decipher.update(payload, 'base64'), decipher.final()]).toString('utf8');
    }
}

// let c = new AxisCrypto("")
// let cipherText = c.encrypt("lorem ipsum dolor set")
// console.log(cipherText)
// let plainText = c.decrypt(cipherText)
// console.log(plainText)

module.exports = AxisCrypto