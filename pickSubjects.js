// picks all described subjects

const fs = require("fs").promises

const run = async () => {
    const save = JSON.parse(await fs.readFile("./data/subjects.json", "utf-8"))
    const detailsSave = JSON.parse(await fs.readFile("./data/subjectDetails.json", "utf-8"))

    console.log("save", Object.keys(save).length)
    console.log("detailsSave", Object.keys(detailsSave).length)

    const pickIds = [] // redacted

    for (let i in pickIds) {
        const pickId = pickIds[i]

        const subject = save[pickId]
        const subjectDetails = detailsSave[pickId]
        const subjectDetail = subjectDetails.find(it => !it.isNotStarted) // TODO add check if class is full

        console.log("picking", pickId, subject.title, subjectDetail.id)

        const authData = await JSON.parse(await fs.readFile("./data/token.json", "utf-8"))

        const start = Date.now()

        let jsonResponse = null

        while (true) {
            try {
                const req = await fetch("https://neptun3r.web.uni-corvinus.hu/Hallgatoi/api/SubjectApplication/SubjectSignin", {
                    "headers": {
                        "accept": "application/json, text/plain, */* ",
                        "content-type": "application/json",
                        "authorization": "Bearer " + authData.accessToken,
                    },
                    "body": JSON.stringify({
                        "courseIds": [subjectDetail.id],
                        "curriculumTemplateId": subject.curriculumTemplateId,
                        "curriculumTemplateLineId": null,
                        "scheduledSubjectId": null,
                        "subjectId": subject.id,
                        "termId": subject.termId
                    }),
                    "method": "POST"
                })

                jsonResponse = await req.json()

                break
            } catch (error) {
                console.log("error", pickId, error)
                //console.log("error", pickId, error.message)
                continue
            }
        }

        const secSpent = (Date.now() - start) / 1000

        console.log("pick done", pickId, secSpent)
        console.log(jsonResponse)
    }
}

run()

//

const wait = () => {
    setTimeout(wait, 1000)
}

wait()