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
    {x: 750, y: 400},
    {x: 250, y: 100},
    {x: 475, y: 200},
    {x: 50,  y: 300},
    {x: 300, y: 350}
  ]
}

// function to set a satellite position, and update the list
// of available posotions
function setSatPosition(sat) {
  pos = satPositions.available.pop()
  satPositions[sat.norad_cat_id] = pos
  return ("position: absolute; left: " + pos.x + "px; top: " + pos.y + "px;")
}

// function to add a satellite's position back to the list of available
// positions
function freeSatPosition(sat) {
  pos = satPositions[sat.norad_cat_id]
  delete satPositions[sat.norad_cat_id]

  satPositions.available.push(pos)
}

function drawSatellites(sats) {
  var boxSat = d3.select("#content")
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
    {x: 400, y: 510},
    {x: 0,   y: 610},
    {x: 550, y: 610},
    {x: 270, y: 610},
    {x: 750, y: 640},
    {x: 150, y: 490}
  ]
}

// function to set a station position, and update the list of
// available posotions
function setStationPosition(station) {
  pos = stationPositions.available.pop()
  stationPositions[station.id] = pos
  return ("position: absolute; left: " + pos.x + "px; top: " + pos.y + "px;")
}

// function to add a station's position back to the list of
// available positions
function freeStationPosition(station) {
  pos = stationPositions[station.id]
  delete stationPositions[station.id]

  stationPositions.available.push(pos)
}

function drawStations(stations) {

  var boxStation = d3.select("#content")
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

function getSatCenterPos(observation) {
  var cornerPos = satPositions[observation.norad_cat_id]

  var satBoundingRect = d3.select("#sat-" + observation.norad_cat_id)
                          .node()
                          .getBoundingClientRect()

  return {
    x: cornerPos.x + (satBoundingRect.width/2),
    y: cornerPos.y + 80
  }
}

function getStationCenterPos(observation) {
  var cornerPos = stationPositions[observation.ground_station]

  var stationBoundingRect = d3.select("#station-" + observation.ground_station)
                          .node()
                          .getBoundingClientRect()

  return {
    x: cornerPos.x + (stationBoundingRect.width/2),
    y: cornerPos.y + 60
  }
}

function drawTransmissionLines(observations) {

  var transmLine = d3.select("#svg-content")
                     .selectAll(".transmission-line")
                     .data(observations)

  transmLine.exit()
            .remove()

  transmLineEnter = transmLine.enter()
                              .append("line")
                              .attr("class", "transmission-line")
                              .attr("id", d => "obs-" + d.id)
                              .attr("stroke", "black")
                              .attr("stroke-cap", "round")
                              .attr("stroke-width", "2")
                              .attr("stroke-dasharray", "7,7")
                              .attr("x1", d => getStationCenterPos(d).x)
                              .attr("y1", d => getStationCenterPos(d).y)
                              .attr("x2", d => getSatCenterPos(d).x)
                              .attr("y2", d => getSatCenterPos(d).y)
}

function animateTransmissionLines() {
  d3.selectAll(".transmission-line")
    .attr("stroke-dashoffset", 0)
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("stroke-dashoffset", 14)
    .on("end", animateTransmissionLines)
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

  var carouselObservations = carousel.observations()
  var carouselSats = carousel.satellites()
  var carouselStations = carousel.stations()
  carouselStations.splice(0,0,theFutureStartsHereStation)

  // update d3!
  drawStations(carouselStations)
  drawSatellites(carouselSats)
  drawTransmissionLines(carouselObservations)

  animateTransmissionLines()

  sync.setHighlightInterval(function() {
    var {station, satellite, observation} = carousel.highlighted()


    d3.selectAll(".box-sat").classed("highlighted", false)
    d3.selectAll(".box-station").classed("highlighted", false)

    d3.select("#sat-" + satellite.norad_cat_id).classed("highlighted", true)
    d3.select("#station-" + station.id).classed("highlighted", true)

    d3.selectAll(".transmission-line").attr("stroke", "black")
                                      .attr("opacity", "0.2")
    d3.select("#obs-" + observation.id).attr("stroke", "#0C3")
                                      .attr("opacity", "1")
  })

})
