var xhr = require('xhr')

module.exports = getSatellites

function getSatellites (cb) {
  var opts = {
    uri: `https://db.satnogs.org/api/satellites/?format=json`,
    json: true,
    timeout: 10000
  }

  xhr(opts, function (err, res, body) {
    if (err) return console.log('error getting satellites', err)

    window.state.satellites = body
    cb()
  })
}
