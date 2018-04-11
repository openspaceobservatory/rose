var fileExtension = require('file-extension')

var api = require('./lib/api')
var countdown = require('./lib/countdown')
var isImage = require('./lib/is-image')
var carousel = require('./lib/carousel')
var sync = require('./lib/sync')

window.state = {
  observations: [],
  satellites: [],
  satellitesById: {},
  satellitesByName: {},
  stations: [],
  stationsById: {},
  stationsByName: {}
}

// Set widths
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var imageIndex = 0
var renderFlag = false

var el_img = d.getElementById('satellite-image')
var el_countdown = d.getElementById('countdown')
var el_info_satellite = d.getElementById('info-satellite')
var el_info_station = d.getElementById('info-station')

api(function () {
  if (!renderFlag) {
    renderFlag = true
    sync.setHighlightInterval(renderImage)
  }
})

countdown(function (time) {
  el_countdown.innerText = `Time until new satellite data: ${time}`
})

function renderImage () {

  var {observation, station, satellite} = carousel.highlighted()

  el_img.src = source()

  el_info_satellite.innerText = `Satellite: ${satellite.name}`
  el_info_station.innerText = `Observed by: ${station.name}`

  function source () {
    if (observation.demoddata.length > 0) {
      var entry = observation.demoddata[0].payload_demod
      var ext = fileExtension(entry)

      if (isImage(ext)) return entry
    }

    if (observation.waterfall) {
      return observation.waterfall
    } else {
      return 'assets/dist/img/transparent.png'
    }
  }
}
