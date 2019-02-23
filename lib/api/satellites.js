var xhr = require('xhr')

module.exports = getSatellites

function getSatellites (cb) {
  var opts = {
    uri: `https://rose-proxy.herokuapp.com/satellites`,
    json: true,
    timeout: 10000
  }

  xhr(opts, function (err, res, body) {
    if (err) return console.log('error getting satellites', err)

    window.state.satellites = body

    body.forEach(function (satellite, i) {
      var id = satellite.norad_cat_id
      var name = satellite.name

      window.state.satellitesById[id] = satellite
      window.state.satellitesByName[name] = satellite

      if (i + 1 === body.length) return cb()
    })
  })
}
