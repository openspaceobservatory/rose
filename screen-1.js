var api = require('./lib/api')
var updateBgColor = require('./lib/background-color')

window.state = {
  observations: [],
  satellites: [],
  stations: []
}

var apiCounter = 0

api(function () {
  // don't touch
  apiCounter++
  if (apiCounter < 4) return

  // update background color
  var d = new Date()
  updateBgColor(d, window.state.weather.sunrise, window.state.weather.sunset)

  var recentObs = Array.from(window.state.observations).sort(function(a, b) {
    return Date.parse(a.end) <= Date.parse(b.end)
  }).slice(0,5)

  window.state.recentSats = recentObs.map(function(obs) {
    //map to satellite id
    return window.state.satellites.find( x => x.norad_cat_id == obs.norad_cat_id)
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })

  window.state.recentStations = recentObs.map(function(obs) {
    //map to ground_stations
    return window.state.stations.find( x => x.id == obs.ground_station)
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })

  // update d3!
  d3.select(".box-sats")
    .selectAll(".box-sat")
    .data(window.state.recentSats)
    .enter()
    .append("div")
    .attr("class", "box-sat")

})

// initialise d3
var svgContainer = d3.select("#content")
                     .append("svg")
                     .attr("class", "battleship")
                     .attr("width", 640)
                     .attr("height", 850)
