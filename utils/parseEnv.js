const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const argv = require('minimist')(process.argv.slice(2))

const resolve = dir => path.join(__dirname, dir)
const prefixRE = /^NUXT_APP_/

const env = variableExpansion(
  dotenv.parse(
    fs.readFileSync(resolve(`../.env.${argv.mode || 'development'}`))
  )
)
Object.keys(env).forEach(key => {
  if (prefixRE.test(key) || key === 'NODE_ENV') {
    env[key] = JSON.stringify(env[key])
  } else {
    Reflect.deleteProperty(env, key)
  }
})

module.exports = env
