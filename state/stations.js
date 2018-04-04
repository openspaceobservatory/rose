var xhr = require('xhr')

module.exports = stations

function stations (state, emitter) {
  state.stations = {}

  state.stations.byId = {}
  state.stations.ordered = []

  var pageCounter = 1
  queryStations()

  function queryStations () {
    var opts = {
      uri: `https://network.satnogs.org/api/stations/?page=${pageCounter}&format=json`,
      json: true,
      timeout: 10000
    }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error', err)

      body.forEach(function (station, i) {
        var {id} = station

        state.stations.byId[id] = station
        state.stations.ordered.push(station)

        if ((i + 1) === body.length && body.length === 25) {
          pageCounter++
          queryStations()
        } else {
          emitter.emit('render')
        }
      })
    })
  }
}
