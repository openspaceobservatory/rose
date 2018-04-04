var xhr = require('xhr')

module.exports = satellites

function satellites (state, emitter) {
  state.satellites = {}

  state.satellites.byId = {}
  state.satellites.ordered = []

  querySatellites()

  function querySatellites () {
    var opts = {
      uri: `https://db.satnogs.org/api/satellites/?format=json`,
      json: true,
      timeout: 10000
    }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error', err)

      state.satellites.ordered = body
      body.forEach(function (satellite, i) {
        var {id} = satellite
        state.satellites.byId[id] = satellite

        if (i + 1 === body.length) emitter.emit('render')
      })
    })
  }
}
