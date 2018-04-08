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

// initialise d3
var svgContainer = d3.select("#content")
                     .append("svg")
                     .attr("class", "battleship")
                     .attr("width", x)
                     .attr("height", y)

svgContainer.append('svg:image')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', '75%')
  .attr('height', '75%')

var apiCounter = 0
api(function () {
  // don't touch
  apiCounter++
  if (apiCounter < 3) return

  // update d3!
  svgContainer.select('image')
    .data(window.state.observations)
    .filter(function (d, i) {
      return i === 0
    })
    .attr('xlink:href', function (d) {
      if (d.demoddata.length > 1) {
        var entry = d.demoddata[0]
        var ext = fileExtension(entry)

        if (isImage(ext)) {
          return entry
        } else {
          return d.waterfall
        }
      } else {
        return d.waterfall
      }
    })
})
