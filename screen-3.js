var fileExtension = require('file-extension')

var api = require('./lib/api')
var countdown = require('./lib/countdown')
var isImage = require('./lib/is-image')

window.state = {
  observations: [],
  satellites: [],
  stations: []
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

api(function () {
  if (!renderFlag) {
    renderFlag = true
    render()
  }
})

countdown(function (time) {
  el_countdown.innerText = `Time until new satellite data: ${time}`
})

function render () {
  renderImage()
  setInterval(renderImage, 10000)
}

function renderImage () {
  var observation = w.state.observations[imageIndex]
  el_img.src = source()

  if (imageIndex === 49) {
    imageIndex = 0
  } else {
    imageIndex++
  }

  function source () {
    if (observation.demoddata.length > 0) {
      var entry = observation.demoddata[0].payload_demod
      var ext = fileExtension(entry)

      if (isImage(ext)) return entry
    }

    if (observation.waterfall) {
      return observation.waterfall
    } else {
      return renderImage()
    }
  }
}
