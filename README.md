# neptun-class-autopicker

Pick classes in Neptun without logging into the web interface.

In case the server is under heavy load, it's usually next to impossible to log in traditionally. We solve this by using the minimum amount of requests to pick a subject.

## Usage

1. Create the file `data/login.json`

Add the following structure:

```
{
    "username": "<neptun username>",
    "password": "<neptun password>",
    "twoFactor": "<totp token secret>"
}
```

2. Run `node authSimple.js`
3. Change  `termId` and `curriculumTemplateId` inside `scrape.js`, `scrapeDetails.js`
4. Run `node scrape.js`
5. Run `node scrapeDetails.js`
6. Find the subject IDs you want to pick for the semester inside `data/subjets.json`
7. Add the subjets to the `pickIds` array inside `pickSubjects.js`
8. Run `node pickSubjects.js`

## Limitations

All these limitations are relatively easy to fix with a basic understanding of Neptun's API.

- The code doesn't scrape details for normal subjects (kötelező, kötelezően választhatö), only extracurriculars (szabadon választható)
- The code only supports picking extracurricular subjects, as it picks the first course inside every subject you specify
- The code doesn't pick multiple courses for a subject if there is both lecture and seminar, only picks the first
- The code doesn't check if the first course for the subject is full, only checks if the course will start

## Extras

All information regarding each js file is documented at the start of each.

Alongside the subject picker, the repo includes a combined authentication and auth token refresher, a script to get all extracurriculars with lecture only and a script to get all courses you've picked.