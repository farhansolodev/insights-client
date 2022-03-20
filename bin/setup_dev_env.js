async function setupDevEnv(runCmd, __rootdir) {
    runCmd(`npm i --save fs-extra`, 'Succesfully installed fs-extra')
    const fs = require('fs-extra')

    // const __rootdir = `${__dirname.replace(/bin/g,"")}`
    const projname = 'insights-client'
    const gitUrl = "https://github.com/farhansolodev/insights-client"

    const currPath = `${__rootdir}\\${projname}\\.git`
    const newPath = `${__rootdir}\\.git`

    runCmd(`IF EXIST "${newPath}" rmdir /s /q ${newPath}`, `Succesfully removed existing .git folder in ${__rootdir}`)
    runCmd(`git clone --no-checkout --depth=1 ${gitUrl}`, "Succesfully retrieved special .git folder");

    try {
        await fs.copy(currPath, newPath)
        console.log('Successfully copied .git!')
        runCmd(`rmdir /s /q ${__rootdir}\\${projname}`, "Succesfully removed cloned project folder")

        console.log(`Setup successful! Project '${projname}' can be found at:\n\n\t${__rootdir}\n`)
    } catch (err) {
        throw err
    }

}

module.exports = setupDevEnv