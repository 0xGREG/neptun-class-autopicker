// displays your current access token

const fs = require("fs").promises

const run = async () => {
    const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))

    console.log(authData.accessToken)
}

run()