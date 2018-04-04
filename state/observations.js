var xhr = require('xhr')

module.exports = observations

function observations (state, emitter) {
  state.observations = {}

  state.observations.byId = {}
  state.observations.ordered = []

  var pageCounter = 1
  const maxPages = 25

  queryObservations()
  setInterval(queryObservations, 60000)

  function queryObservations () {
    var opts = {
      uri: `https://network.satnogs.org/api/observations/?page=${pageCounter}&format=json`,
      json: true,
      timeout: 10000
    }

    xhr(opts, function (err, res, body) {
      if (err) return console.log('error', err)

      body.forEach(function (observation, i) {
        if (observation.vetted_status === 'good') {
          var {id, start} = observation

          if (!state.observations.byId[id]) {
            var ordered = state.observations.ordered
            state.observations.byId[id] = observation

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
            emitter.emit('render')
          }
        }
      })
    })
  }
}
