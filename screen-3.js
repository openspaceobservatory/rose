var fileExtension = require('file-extension')

var api = require('./lib/api')
var isImage = require('./lib/is-image')

window.state = {
  observations: [],
  observationImages: [],
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

var apiCounter = 0
var imageIndex = 0
var renderFlag = false

var img = d.createElement('img')
d.getElementById('content').appendChild(img)

api(function () {
  // don't touch
  apiCounter++
  if (apiCounter < 3) return

  var observations = w.state.observations
  observations.forEach(function (observation, i) {
    if (observation.demoddata.length > 1) {
      var entry = observation.demoddata[0]
      var ext = fileExtension(entry)

      if (isImage(ext)) {
        w.state.observationImages.push(entry)
      } else {
        w.state.observationImages.push(observation.waterfall)
      }
    } else {
      w.state.observationImages.push(observation.waterfall)
    }

    if (i + 1 === observations.length) {
      if (!renderFlag) {
        renderFlag = true
        render()
      }
    }
  })
})

function render () {
  renderLogic()
  setInterval(renderLogic, 10000)
}

function renderLogic () {
  img.src = w.state.observationImages[imageIndex]
  imageIndex++
}
