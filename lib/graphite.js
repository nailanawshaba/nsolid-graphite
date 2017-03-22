'use strict'

const dgram = require('dgram')

const util = require('./util')

const Metrics =
  ('rss heapTotal heapUsed activeRequests activeHandles cpu ' +
  'freeMem load1m load5m load15m cpuSpeed').split(' ')

exports.createClient = createClient

function createClient (conf) {
  const parts = util.parseAddress(conf.graphiteAddress)
  const host = parts[0]
  const port = parseInt(parts[1], 10)

  return new GraphiteClient(host, port, conf)
}

class GraphiteClient {
  constructor (host, port, conf) {
    this.host = host
    this.port = port
    this.conf = conf
    this.socket = dgram.createSocket('udp4')

    util.debug(`created graphite client: ${host}:${port}`)
  }

  sendNSolidMetrics (stats) {
    this.sendNSolidStats('process', Metrics, stats)
  }

  sendNSolidStats (type, fields, stats) {
    const timestamp = Math.floor(Date.now() / 1000)

    for (let statName of fields) {
      const metricName = `${this.conf.prefix}.${stats.app}.${type}.${statName}`
      this.sendGauge(metricName, stats[statName], timestamp)
    }
  }

  sendGauge (name, val, timestamp) {
    // graphite protocol
    // http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol

    if (val == null) return

    let msg = `${name} ${val} ${timestamp}\n`

    util.debug(`sending graphite packet: ${msg}`)
    msg = new Buffer(msg)

    this.socket.send(msg, 0, msg.length, this.port, this.host, onSend)

    function onSend (err, bytes) {
      if (err) return console.error(`error sending graphite gauge: ${err}`)
    }
  }
}
