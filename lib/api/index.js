var observations = require('./observations')
var satellites = require('./satellites')
var stations = require('./stations')

module.exports = runApi

function runApi (cb) {
  var counter = 0

  observations(callback)
  satellites(callback)
  stations(callback)

  function callback () {
    if (counter >= 2) return cb()
    counter++
  }
}
