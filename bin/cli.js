#!/usr/bin/env node

const { execSync } = require('child_process')

const runCmd = cmd => {
   try {
       execSync(`${cmd}`, { stdio: 'inherit', cwd: `${__dirname.replace(/bin/g,"")}` })
   } catch (e) {
       console.error(`Failed to execute ${cmd}`, e)
       return false
   }
   return true
}

const cmd = `npm start`

runCmd(cmd)
