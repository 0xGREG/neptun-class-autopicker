// automatically logs in user with the provided credentials

const fs = require("fs").promises
const twofactor = require("node-2fa")

const loginData = require("./data/login.json")

module.exports = async () => {
    try {
        await fs.mkdir("./sessions")
    } catch (error) { }

    const twoFactorToken = twofactor.generateToken(loginData.twoFactor).token

    console.log("logging in", twoFactorToken)

    const req = await fetch("https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/Account/Authenticate", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
        },
        "body": JSON.stringify({
            "userName": loginData.username,
            "password": loginData.password,
            "captcha": "",
            "captchaIdentifier": "",
            "token": twoFactorToken,
            "LCID": 1038
        }),
        "method": "POST"
    })

    const jsonResponse = await req.json()

    console.log("auth done", jsonResponse)

    if (jsonResponse.data && jsonResponse.data.accessToken) {
        await fs.writeFile("./data/token.json", JSON.stringify(jsonResponse.data))
        await fs.writeFile("./sessions/" + Math.random().toString(), JSON.stringify(jsonResponse.data))

        return true
    }

    return false
}
