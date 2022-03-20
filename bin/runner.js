#!/usr/bin/env node
(async () => {
    const { execSync } = require('child_process')
    const setupDevEnv = require('./setup_dev_env')

    const args = process.argv.slice(2)
    const isContributor = args.includes("--contributor") || args.includes("-c")
    const wantsToRun = args.includes("--run") || args.includes("-r")
    const wantsHelp = args.includes("--help") || args.includes("-h")
    const noArgs = !(isContributor || wantsToRun || wantsHelp)

    const __rootdir = `${__dirname.replace(/bin/g,"")}`
    const projname = 'insights-client'

    function runCmd(cmd, successMsg) {
        try {
            execSync(cmd, { stdio: 'inherit' ,cwd: __rootdir })
            console.log(`${successMsg}`)
        } catch (e) {
            console.error(e)
            process.exit(-1)
        }
    }

    if (noArgs || wantsHelp) (() => {
        console.log(`
Usage: npx ${projname} <flag>
where <flag> can be:
[--help | -h], [--contributor | -c], [--run | -r], 

 npx ${projname} --help | -h
 quick help
 
 npx ${projname} --contributor | -c
 set up developer environment
 
 npx ${projname} --run | -r
 run project's 'npm start' script
        `)
    })()

    isContributor && await setupDevEnv(runCmd, __rootdir)

    wantsToRun && (() => {
        console.log(`Starting project '${projname}':\n`)
        runCmd(`npm start`)
    })()

})()
