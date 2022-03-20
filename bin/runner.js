#!/usr/bin/env node
const { execSync } = require('child_process')

const __rootdir = `${__dirname.replace(/bin/g,"")}`
const projname = 'insights-client'

const runCmd = cmd => {
   try {
       execSync(`${cmd}`, { stdio: 'inherit', cwd: __rootdir })
   } catch (e) {
       console.error(`Failed to execute ${cmd}\n\n`, e)
       process.exit(-1)
   }
}

const projMainCmd = `npm start`

console.log(`
Setup succesful! Project '${projname}' can be found at:\n
\n\t${__rootdir}\n
`)
runCmd(projMainCmd)
