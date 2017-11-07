#!/usr/bin/env node
const cp = require('child_process')
const [task, ...args] = process.argv.slice(2)

const run = (cmd) =>
  cp.execSync(cmd, { stdio: [0,1,2] })

switch (task) {
  case 'lint':
    run('$(npm bin)/eslint')
    break
  case 'prettier':
    run('$(npm bin)/prettier')
    break
  default:
    throw new Error(`Unknown task "${task}"`)
}
