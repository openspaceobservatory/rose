var xhr = require('xhr')
var sync = require('../sync')

module.exports = getObservations

function getObservations (cb) {
  var pageCounter = 1
  const maxPages = 25

  var observationIds = {}
  sync.setQueryInterval(queryObservations)

  function queryObservations () {
    var opts = {
        uri: `https://rose-proxy.herokuapp.com/observations/${pageCounter}`,
        json: true,
        timeout: 10000
      }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error getting observations', err)

      body.forEach(function (observation, i) {
        var observationIsGood = observation.vetted_status === 'good'
        var stationIsOnline = window.state.stationsById[observation.ground_station]

        if (observationIsGood && stationIsOnline) {
          var {id, start, norad_cat_id, ground_station} = observation

          if (!observationIds[`${norad_cat_id}-${ground_station}`]) {
            var ordered = window.state.observations
            observationIds[`${norad_cat_id}-${ground_station}`] = observation

            var newStart = new Date(observation.start)

            var found = ordered.findIndex(function (oldObservation, index) {
              var oldStart = new Date(oldObservation.start)
              return (oldStart < newStart)
            })

            if (found === -1) found = ordered.length
            ordered.splice(found, 0, observation)
          }
        }

        if ((i + 1) === body.length) {
          pageCounter++

          if (pageCounter < maxPages) {
            queryObservations()
          } else {
            pageCounter = 1
            cb()
          }
        }
      })
    })
  }
}
