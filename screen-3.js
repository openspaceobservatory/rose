var fileExtension = require('file-extension')

var api = require('./lib/api')
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

var img = d.getElementById('satellite-image')

api(function () {
  if (!renderFlag) {
    renderFlag = true
    render()
  }
})

function render () {
  renderImage()
  setInterval(renderImage, 10000)
}

function renderImage () {
  var observation = w.state.observations[imageIndex]
  img.src = source()

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

    return observation.waterfall
  }
}
