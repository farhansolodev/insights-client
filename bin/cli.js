#!/usr/bin/env node

const { execSync } = require('child_process')

const runCmd = cmd => {
   try {
       execSync(`${cmd}`, { stdio: 'inherit' })
   } catch (e) {
       console.error(`Failed to execute ${cmd}`, e)
       return false
   }
   return true
}

runCmd("echo $pwd")

//const repo = process.argv[2]
//const gitCheckoutCmd =  `git clone --depth 1 https://github.com/farhansolodev/insights-client ${repo}`
//const installDepsCmd = `cd ${repo} && npm install`
//
//console.log(`Cloning the repository with name ${repo}`)
//const checkedOut = runCmd(gitCheckoutCmd)
//if (!checkedOut) process.exit(-1)
//
//console.log(`Installing dependencies for ${repo}`)
//const installedDeps = runCmd(installDepsCmd)
//if (!installedDeps) process.exit(-1)
//
//console.log('Congratulations! You are ready. Run the following commands to start:')
//console.log(`\ncd ${repo} && npm start\n`)