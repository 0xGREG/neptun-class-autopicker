// get all courses of the user for specific term ID that are already picked

const fs = require("fs").promises

const run = async () => {
    const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))
    const termId = 0 // redacted

    const endpoint = `https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/SubjectApplication/ScheduledSubjectsWithScheduledCourses?model.withRegisteredSubjects=true&model.termId=${termId}&sort.firstRow=0&sort.lastRow=9999&sort.title=asc`

    const req = await fetch(endpoint, {
        "headers": {
            "accept": "application/json, text/plain, */* ",
            "authorization": "Bearer " + authData.accessToken,
        },
        "body": null,
        "method": "GET"
    })

    const jsonResponse = await req.json()

    console.log(jsonResponse.data.gridData.map(it => it.title))
}

run()

//

const wait = () => {
    setTimeout(wait, 1000)
}

wait()