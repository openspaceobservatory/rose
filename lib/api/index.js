var observations = require('./observations')
var satellites = require('./satellites')
var stations = require('./stations')

module.exports = runApi

function runApi (cb) {
  observations(cb)
  satellites(cb)
  stations(cb)
}
