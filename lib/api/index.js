var observations = require('./observations')
var satellites = require('./satellites')
var stations = require('./stations')
var weather = require('./weather')

module.exports = runApi

function runApi (cb) {
  weather(cb)
  observations(cb)
  satellites(cb)
  stations(cb)
}
