module.exports = function(context) {
    const key = context.request.getEnvironmentVariable("AxisEncryptionKey")
    if (key === undefined) {
        console.log("No encryption key env set so skipping decryption")
        return
    }

    if (context.response.getHeader("Content-Type") !== "application/json") return;

    const response = JSON.parse(context.response.getBody().toString())
    console.log("Processing response for decryption: ", response)
    const unwrappedResponseKey = Object.keys(response)[0]
    let responseBodyKey = Object.keys(response[unwrappedResponseKey]).find(field => field.endsWith("ResponseBodyEncrypted"))

    if (responseBodyKey !== undefined) {
        console.log("Found decryptable field: " + responseBodyKey + " with value " + JSON.stringify(response[unwrappedResponseKey][responseBodyKey]))

        const AxisCrypto = require("./axis-crypto")
        let crypto = new AxisCrypto(key)
        let responseBodyDecrypted = JSON.parse(crypto.decrypt(JSON.stringify(response[unwrappedResponseKey][responseBodyKey])))
        delete response[unwrappedResponseKey][responseBodyKey];

        response[unwrappedResponseKey][responseBodyKey.replace("Encrypted", "")] = responseBodyDecrypted

        console.log("New response: ", response)
        context.response.setBody(Buffer.from(JSON.stringify(response)))
    } else {
        console.log("Decryptable field not found")
    }
}
