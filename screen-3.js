var api = require('./lib/api')

window.state = {
  observations: [],
  satellites: [],
  stations: []
}

var apiCounter = 0

api(function () {
  // don't touch
  apiCounter++
  if (apiCounter < 3) return

  // update d3!
})

// initialise d3
var svgContainer = d3.select("#content")
                     .append("svg")
                     .attr("class", "battleship")
                     .attr("width", 640)
                     .attr("height", 850)
