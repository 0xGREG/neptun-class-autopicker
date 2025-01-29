// refreshes the auth token every 30 seconds, recommended to use authComplex.js instead

const reauthModule = require('./authRefreshModule')

reauthModule()

//

setInterval(() => {
    reauthModule()
}, 30000)