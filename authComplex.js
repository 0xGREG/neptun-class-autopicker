// tries to refresh token every 30 seconds, if the token is expired, tries to log you in again

const authModule = require("./authModule")
const authRefreshModule = require('./authRefreshModule')

const run = async () => {
    try {
        const reauthResult = await authRefreshModule()

        if (!reauthResult) {
            console.log("reauthing")
            await authModule()
        }
    } catch (error) {
        console.log("auth error", error)
    }

    setTimeout(run, 30000)
}

run()