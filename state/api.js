var xhr = require('xhr')

module.exports = api

function api (state, emitter) {
  var pageCounter = 1
  const maxPages = 25

  var stationPageCounter = 1

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
          emitter.emit('observations:add', observation)
        }

        if ((i + 1) === body.length) {
          pageCounter++

          if (pageCounter < maxPages) {
            queryObservations()
          } else {
            pageCounter = 1
          }
        }
      })
    })
  }
}
