// displays your current access token after logging in

const fs = require("fs").promises

const run = async () => {
    const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))

    console.log(authData.accessToken)
}

run()