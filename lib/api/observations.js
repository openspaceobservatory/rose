var xhr = require('xhr')

module.exports = getObservations

function getObservations (cb) {
  var pageCounter = 1
  const maxPages = 25

  var observationIds = {}

  queryObservations()
  setInterval(queryObservations, 60000)

  function queryObservations () {
    var opts = {
      uri: `https://network.satnogs.org/api/observations/?page=${pageCounter}&format=json`,
      json: true,
      timeout: 10000
    }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error getting observations', err)

      body.forEach(function (observation, i) {
        if (observation.vetted_status === 'good') {
          var {id, start} = observation

          if (!observationIds[id]) {
            var ordered = window.state.observations
            observationIds[id] = observation

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
