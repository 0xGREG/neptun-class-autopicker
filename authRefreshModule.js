// logic to refresh existing auth token

const fs = require("fs").promises

module.exports = async () => {
    const authData = JSON.parse(await fs.readFile("./data/token.json", "utf-8"))

    if (!authData.accessToken || !authData.refreshToken)
        return false

    console.log("reauthing")

    const start = Date.now()

    const req = await fetch("https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/Account/GetNewTokens", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "authorization": "Bearer " + authData.accessToken
        },
        "body": JSON.stringify({
            "refreshToken": authData.refreshToken
        }),
        "method": "POST"
    })

    if (req.status !== 200) {
        console.log("reauth bad status", req.status)

        return false
    }

    let jsonResponse

    try {
        jsonResponse = await req.json()
    } catch (error) {
        console.log("reauth failed", error)

        return false
    }

    const secSpent = (Date.now() - start) / 1000

    if (jsonResponse.accessToken != "" && jsonResponse.refreshToken != "") {
        console.log("reauth done", secSpent, (new Date(Date.now())).toLocaleString("hu-HU"))

        authData.accessToken = jsonResponse.accessToken
        authData.refreshToken = jsonResponse.refreshToken

        await fs.writeFile("./data/token.json", JSON.stringify(authData, null, 4))
    }

    return true
}
