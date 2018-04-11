var xhr = require('xhr')

module.exports = getWeather

wunderground_api_key = process.env.ROSE_WUNDERGROUND_API_KEY

function getWeather (cb) {
  var opts = {
    uri: `https://api.wunderground.com/api/${wunderground_api_key}/astronomy/q/autoip.json`,
    json: true,
    timeout: 10000
  }

  xhr(opts, function (err, res, body) {
    if (err) return console.log('error getting weather', err)

    window.state.weather = body.sun_phase

    cb()
  })
}
