// refreshes the auth token every 30 seconds

const reauthModule = require('./authRefreshModule')

reauthModule()

//

setInterval(() => {
    reauthModule()
}, 30000)