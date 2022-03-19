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

runCmd("cd src && ls")

// const repo = "insights-client"
// const gitCheckoutCmd =  `\ngit clone --depth 1 https://github.com/farhansolodev/${repo}\n`
// const installDepsCmd = `cd ${repo} && npm install`
//
// console.log(`\nCloning the repository with name ${repo}`)
// const checkedOut = runCmd(gitCheckoutCmd)
// if (!checkedOut) process.exit(-1)
//
// console.log(`\nInstalling dependencies for ${repo}\n`)
// const installedDeps = runCmd(installDepsCmd)
// if (!installedDeps) process.exit(-1)
//
// console.log('\nCongratulations! You are ready. Run the following commands to start:')
// console.log(`\ncd ${repo} && npm start\n`)