var observations = require('./observations')
var satellites = require('./satellites')
var stations = require('./stations')
var weather = require('./weather')

module.exports = runApi

function runApi (cb) {
  var counter = 0
  
  observations(callback)
  satellites(callback)
  stations(callback)
  weather(callback)

  function callback () {
    if (counter >= 3) return cb()
    counter++
  }
}
