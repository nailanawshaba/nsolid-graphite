'use strict'

const dgram = require('dgram')

const util = require('./util')

const Metrics = [
  'uptime', 'rss', 'heapTotal', 'heapUsed', 'activeRequests', 'activeHandles',
  'title', 'user', 'cpu', 'freeMem', 'systemUptime', 'load1m', 'load5m', 'id',
  'load15m', 'cpuSpeed', 'app', 'hostname', 'time', 'percentCpuThreshold',
  'percentHeapThreshold', 'totalHeapSizeExecutable', 'totalPhysicalSize',
  'totalAvailableSize', 'heapSizeLimit', 'loopIdlePercent', 'loopEstimatedLag',
  'loopsPerSecond', 'loopAvgTasks', 'loopTotalCount',
  'blockInputOpCount', 'blockOutputOpCount', 'cpuPercent', 'cpuSystemPercent',
  'cpuUserPercent', 'gcForcedCount', 'gcFullCount', 'gcCount', 'gcCpuPercent',
  'gcDurUs99Ptile', 'gcDurUsMedian', 'pageFaultHardCount', 'ctxSwitchInvoluntaryCount',
  'ipcReceivedCount', 'ipcSentCount', 'gcMajorCount', 'signalCount', 'pageFaultSoftCount',
  'swapCount', 'ctxSwitchVoluntaryCount'
]

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
      const metricName = `${this.conf.prefix}.${stats.app}.${stats.hostname.replace(/\./ig, '_')}.${statName}`
      this.sendGauge(metricName, stats[statName], timestamp)
    }
  }

  sendGauge (name, val, timestamp) {
    // graphite protocol
    // http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol

    if (val == null) return

    util.debug(`sending graphite packet: ${name} ${val} ${timestamp}\n`)

    let msg = Buffer.from(`${name} ${val} ${timestamp}\n`)

    this.socket.send(msg, 0, msg.length, this.port, this.host, onSend)

    function onSend (err, bytes) {
      if (err) return console.error(`error sending graphite gauge: ${err}`)
    }
  }
}
