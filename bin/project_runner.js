function runProject(runCmd, __rootdir) {
    const projname = 'insights-client'
    console.log(`Starting project '${projname}':\n`)
    runCmd('npm start')
}

module.exports = runProject