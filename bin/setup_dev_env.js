async function setupDevEnv(runCmd, __rootdir) {
    runCmd(`npm i --save fs-extra`, 'Succesfully installed fs-extra')
    const fs = require('fs-extra')

    const projname = 'insights-client'
    const fullProjName = "farhansolodev/insights-client"
    const gitUrl = `https://github.com/${fullProjName}`
    const rawGitUrl = `https://raw.githubusercontent.com/${fullProjName}/master`

    const currPath = `${__rootdir}\\${projname}\\.git`
    const newPath = `${__rootdir}\\.git`

    runCmd(`IF EXIST "${newPath}" rmdir /s /q ${newPath}`, `Succesfully removed existing .git folder in ${__rootdir}`)
    runCmd(`git clone --no-checkout --depth=1 ${gitUrl}`, "Succesfully retrieved special .git folder");

    try {
        await fs.copy(currPath, newPath)
        console.log('Successfully copied .git!')
    } catch (err) {
        throw err
    }

    runCmd(`rmdir /s /q ${__rootdir}\\${projname}`, "Succesfully removed cloned project folder")
    runCmd(`wget ${rawGitUrl}/.gitignore -O .gitignore`, "Succesfully retrieved latest .gitignore")
    runCmd(`wget ${rawGitUrl}/package.json -O package.json`, "Succesfully retrieved latest package.json")

    console.log(`Setup successful! Project '${projname}' can be found at:\n\n\t${__rootdir}\n`)

}

module.exports = setupDevEnv