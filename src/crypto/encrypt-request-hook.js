module.exports = function(context) {
    const key = context.request.getEnvironmentVariable("AxisEncryptionKey")
    if (key === undefined) {
        console.log("No encryption key env set so skipping encryption")
        return
    }

    const request = JSON.parse(context.request.requestBody.text)
    console.log("Processing request for encryption: " + JSON.stringify(request))
    const unwrappedRequestKey = Object.keys(request)[0]
    let requestBodyKey = Object.keys(request[unwrappedRequestKey]).find(field => field.endsWith("RequestBody"))

    if (requestBodyKey !== undefined) {
        console.log("Found encryptable field: " + requestBodyKey + " with value " + JSON.stringify(request[unwrappedRequestKey][requestBodyKey]))

        const AxisCrypto = require("./axis-crypto")
        let crypto = new AxisCrypto(key)
        let requestBodyEncrypted = crypto.encrypt(JSON.stringify(request[unwrappedRequestKey][requestBodyKey]))
        delete request[unwrappedRequestKey][requestBodyKey];
        request[unwrappedRequestKey][requestBodyKey + "Encrypted"] = requestBodyEncrypted

        console.log("New request: " + JSON.stringify(request))
    } else {
        console.log("Encryptable field not found")
    }
}

const request = {
    SampleRequest: {
        SubHeader: {
            requestUUID: "uuid"
        },
        SampleRequestBody: {
            name: "Vedavyas Bhat",
            age: 27
        }
    }
}

