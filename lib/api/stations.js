var xhr = require('xhr')

module.exports = getStations

function getStations (cb) {
  var pageCounter = 1
  queryStations()

  function queryStations () {
    var opts = {
      uri: `https://network.satnogs.org/api/stations/?page=${pageCounter}&format=json`,
      json: true,
      timeout: 10000
    }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error getting stations', err)

      body.forEach(function (station, i) {
        window.state.stations.push(station)
        window.state.stationsById[station.id] = station
        window.state.stationsByName[station.name] = station

        if ((i + 1) === body.length && body.length === 25) {
          pageCounter++
          queryStations()
        }

        if ((i + 1) === body.length && body.length !== 25) {
          cb()
        }
      })
    })
  }
}
