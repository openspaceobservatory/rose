var api = require('./lib/api')
var countdown = require('./lib/countdown')
var updateBgColor = require('./lib/background-color')
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

function randomSatSprite() {
  var satSprites = ["assets/dist/img/cubesat1.png", "assets/dist/img/cubesat2.png"]
  return satSprites[Math.round(Math.random())]
}


// preset positions for satellites
var satPositions = {
  available: [
    {left: "750px", top: "400px"},
    {left: "250px", top: "100px"},
    {left: "475px", top: "200px"},
    {left: "50px", top: "300px"},
    {left: "300px", top: "350px"}
  ]
}

// function to set a satellite position, and update the list
// of available posotions
function setSatPosition(sat) {
  pos = satPositions.available.pop()
  satPositions[sat.norad_cat_id] = pos
  return ("position: absolute; left: " + pos.left + "; top: " + pos.top + ";")
}

// function to add a satellite's position back to the list of available
// positions
function freeSatPosition(sat) {
  pos = satPositions[sat.norad_cat_id]
  delete satPositions[sat.norad_cat_id]

  satPositions.available.push(pos)
}

function drawSatellites(sats) {
  var boxSat = d3.select(".box-sats")
                 .selectAll(".box-sat")
                 .data(sats, function(d) {return d.norad_cat_id})

  boxSat.exit()
        .attr("style", freeSatPosition)
        .remove()

  boxSatEnter = boxSat.enter()
                      .append("div")
                      .attr("class", "box-sat")
                      .attr("id", d => "sat-" + d.norad_cat_id)
                      .attr("style", setSatPosition)

  boxSatEnter.append("span")
             .attr("class", "name-sat")
             .html(d => d.name)
  boxSatEnter.append("br")
  boxSatEnter.append("span")
             .attr("class", "description-icon")
             .html("Origin Information")
  boxSatEnter.append("img")
             .attr("src", randomSatSprite)

}

// preset positions for ground stations
var stationPositions = {
  available: [
    {left: "400px", top: "50px"},
    {left: "0px", top: "150px"},
    {left: "550px", top: "150px"},
    {left: "270px", top: "150px"},
    {left: "750px", top: "180px"},
    {left: "150px", top: "30px"}
  ]
}

// function to set a station position, and update the list of
// available posotions
function setStationPosition(station) {
  pos = stationPositions.available.pop()
  stationPositions[station.id] = pos
  return ("position: absolute; left: " + pos.left + "; top: " + pos.top + ";")
}

// function to add a station's position back to the list of
// available positions
function freeStationPosition(station) {
  pos = stationPositions[station.id]
  delete stationPositions[station.id]

  stationPositions.available.push(pos)
}

function drawStations(stations) {

  var boxStation = d3.select(".box-stations")
                     .selectAll(".box-station")
                     .data(stations)

  boxStation.exit()
            .attr("style", freeStationPosition)
            .remove()

  boxStationEnter = boxStation.enter()
                              .append("div")
                              .attr("class", "box-station")
                              .attr("id", d => "station-" + d.id)
                              .attr("style", setStationPosition)

  boxStationEnter.append("img")
             .attr("src", "assets/dist/img/ground-station-active.png")
  boxStationEnter.append("span")
             .attr("class", "name-station")
             .html(d => d.name)
  boxStationEnter.append("br")
  boxStationEnter.append("span")
             .attr("class", "description-icon")
             .html(d => d.lat.toFixed(2) + ', ' + d.lng.toFixed(2))

}

// dummy station for ground station
// above exhibition:
theFutureStartsHereStation = {
  id: 16,
  name: "The Future Starts Here",
  altitude: 5,
  min_horizon: 30,
  lat: 41.5,
  lng: 52.7,
  qthlocator: "PF95ig",
  location:"London, UK",
  antenna: ["UHF Turnstile"],
  created:"2017-07-15T12:59:11Z",
  last_seen: "2018-04-10T17:14:54Z",
  status: "Online",
  observations:7070,
  description:""
}

var el_countdown = document.getElementById('countdown')

countdown(function (time) {
  el_countdown.innerText = `Time until new satellite data: ${time}`
})

api(function () {
  // update background color
  var d = new Date()
  updateBgColor(d, window.state.weather.sunrise, window.state.weather.sunset)

  var carouselSats = carousel.satellites()
  var carouselStations = carousel.stations()
  carouselStations.splice(0,0,theFutureStartsHereStation)

  // update d3!
  drawStations(carouselStations)
  drawSatellites(carouselSats)

  sync.setHighlightInterval(function() {
    var {station, satellite} = carousel.highlighted()

    d3.selectAll(".box-sat").classed("highlighted", false)
    d3.selectAll(".box-station").classed("highlighted", false)

    d3.select("#sat-" + satellite.norad_cat_id).classed("highlighted", true)
    d3.select("#station-" + station.id).classed("highlighted", true)
  })

})
