// gets all subjects' details

const fs = require("fs").promises

const run = async () => {
    const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))
    const save = JSON.parse(await fs.readFile("./data/subjects.json", "utf-8"))
    const detailsSave = JSON.parse(await fs.readFile("./data/subjectDetails.json", "utf-8").then(it => it, () => "{}"))

    const termId = 0 // redacted
    const curriculumTemplateId = 0 // redacted

    for (let i in save) {
        if (typeof detailsSave[i] !== "undefined") {
            console.log("from save", i, detailsSave[i].length)
            continue
        }

        const endpoint = `https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/SubjectApplication/GetSubjectsCourses?subjectId=${i}&termId=${termId}&curriculumTemplateId=${curriculumTemplateId}&curriculumTemplateLineId=null`

        const req = await fetch(endpoint, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": "Bearer " + authData.accessToken,
            },
            "body": null,
            "method": "GET"
        })

        if (req.status !== 200) {
            console.log("error", i, req.status)
            continue
        }

        const jsonResponse = await req.json()

        //console.log("req", i, jsonResponse)

        if (jsonResponse.data) {
            detailsSave[i] = jsonResponse.data

            console.log("from req", i, detailsSave[i].length)

            await fs.writeFile("./data/subjectDetails.json", JSON.stringify(detailsSave, null, 4))
        }
    }

    console.log("done")
}

run()

//

/*
const wait = () => {
    setTimeout(wait, 1000)
}

wait()
*/