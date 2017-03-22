'use strict'

const rc = require('rc')

const util = require('./util')

exports.getConfig = getConfig

const ValidOptions = '_ help version app prefix'.split(' ')
const DefaultOptions = {
  prefix: 'nsolid'
}

function getConfig (program) {
  const conf = rc(program, DefaultOptions)

  if (conf.h || conf.help || (conf._[0] === '?')) return { help: true }
  if (conf.v || conf.version) return { version: true }

  for (let optionName in conf) {
    if (ValidOptions.indexOf(optionName) === -1) {
      console.log(`invalid option ignored: '${optionName}: ${conf[optionName]}'`)
    }
  }

  conf.graphiteAddress = process.env.GRAPHITE_ADDRESS || conf._[0] || ':'
  conf.graphiteAddress = util.normalizeAddress(conf.graphiteAddress, 2003)

  conf.nsolidAddress = process.env.NSOLID_ADDRESS || conf._[1] || ':'
  conf.nsolidAddress = util.normalizeAddress(conf.nsolidAddress, 4000)

  return conf
}
