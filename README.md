## axis-insomnia-plugin

An insomnia plugin with utilities for Axis Bank APIs

### Features
1. Automagically encrypt JSON Request Body
2. Automagically decrypt JSON Response Body
3. Generate OTP reference ids (for Consent OTP API)

### Usage

1. Clone this repo
2. Move it to:
    - MacOS: `~/Library/Application\ Support/Insomnia/plugins/`
    - Linux: `$XDG_CONFIG_HOME/Insomnia/plugins/ or ~/.config/Insomnia/plugins/`
    - Windows: no
3. Go to `Preferences -> Plugins` and make sure `insomnia-axis` is enabled
4. In your Insomnia environment, set these variables:
    ```json
    {
        "enableRequestEncryption": true,
        "enableResponseDecryption": true,
        "axisEncryptionKey": "axis-encryption-key-base64"
    }
    ```
5. Requests/responses will now be automatically encrypted/decrypted as per the axis format. A template for OTP reference ids will also be available (it will show up in suggestion dialog, `ctrl+space`). Thank me with a beer.