var api = require('./lib/api')
var updateBgColor = require('./lib/background-color')
var carousel = require('./lib/carousel')

window.state = {
  observations: [],
  satellites: [],
  satellitesById: {},
  satellitesByName: {},
  stations: [],
  stationsById: {},
  stationsByName: {}
}

var apiCounter = 0

function randomSatSprite() {
  var satSprites = ["assets/dist/img/cubesat1.png", "assets/dist/img/cubesat2.png"]
  return satSprites[Math.round(Math.random())]
}

api(function () {
  // update background color
  var d = new Date()
  updateBgColor(d, window.state.weather.sunrise, window.state.weather.sunset)

  var carouselSats = carousel.satellites()

  // update d3!
  var boxSat = d3.select(".box-sats")
                 .selectAll(".box-sat")
                 .data(carouselSats)
                 .enter()
                 .append("div")
                 .attr("class", "box-sat")

  boxSat.append("span")
        .attr("class", "name-sat")
        .html(d => d.name)
  boxSat.append("br")
  boxSat.append("span")
        .attr("class", "description-icon")
        .html("Origin Information")
  boxSat.append("img")
        .attr("src", randomSatSprite())

})

// initialise d3
var svgContainer = d3.select("#content")
                     .append("svg")
                     .attr("class", "battleship")
                     .attr("width", 640)
                     .attr("height", 850)
