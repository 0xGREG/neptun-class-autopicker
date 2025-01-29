// get all subjects

const fs = require("fs").promises

const run = async () => {
    const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))
    const save = JSON.parse(await fs.readFile("./data/subjects.json", "utf-8").then(it => it).catch(it => "{}"))
    let count = 0

    const termId = 0 // redacted
    const curriculumTemplateId = 0 // redacted

    while (true) {
        const endpoint = `https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/SubjectApplication/SchedulableSubjects?filter.termId=${termId}&filter.subjectType=2&filter.hasRegisteredSubjects=true&filter.hasScheduledSubjects=true&filter.curriculumTemplateId=${curriculumTemplateId}&filter.subjectGroupId=-1&sort.firstRow=${count}&sort.lastRow=10000&sort.credit=asc`

        const req = await fetch(endpoint, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": "Bearer " + authData.accessToken,
            },
            "body": null,
            "method": "GET"
        })

        const jsonResponse = await req.json()
        const subjects = jsonResponse.data.gridData

        for (let i in subjects) {
            const subject = subjects[i]

            save[subject.id] = subject
        }

        await fs.writeFile("./data/subjects.json", JSON.stringify(save, null, 4))

        console.log("req done", count, subjects.length)

        if (subjects.length === 0)
            break

        count += 10
    }
}

run()

//

/*
const wait = () => {
    setTimeout(wait, 1000)
}

wait()
*/