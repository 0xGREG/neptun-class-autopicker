// displays all subjects that only have lecture (előadás) and no seminar

const fs = require("fs").promises

const run = async () => {
    const save = JSON.parse(await fs.readFile("./data/subjects.json", "utf-8"))
    const detailsSave = JSON.parse(await fs.readFile("./data/subjectDetails.json", "utf-8"))
    const output = []

    console.log("subjects", Object.keys(save).length)
    console.log("subjectDetails", Object.keys(detailsSave).length)

    for (let i in save) {
        const subject = save[i]

        if (subject.title.includes("Testnev")) // skip PE
            continue

        const subjectDetails = detailsSave[i]

        if (subjectDetails.filter(it => it.code.substring(0, 1) === "G").length === 0) {
            //console.log(subject, subjectDetails)
            //console.log(subject.title, subject.credit, subject.requirementType)

            const subjectTime = subjectDetails.filter(it => it.classInstanceInfos.length > 0).map(it =>
                it.classInstanceInfos[0].dayOfWeekText + " " + it.classInstanceInfos[0].startTime + "-" + it.classInstanceInfos[0].endTime).join(", ")

            output.push(`'${subject.title}' CRED${subject.credit}, ${subject.requirementType}, ${subjectTime}`)

        }

    }

    await fs.writeFile("./data/lecture_only.txt", output.join("\n"))
}

run()

//

/*
const wait = () => {
    setTimeout(wait, 1000)
}

wait()
*/