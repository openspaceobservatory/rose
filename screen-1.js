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
    {x: 750, y: 300},
    {x: 250, y: 100},
    {x: 560, y: 190},
    {x: 75,  y: 150},
    {x: 325, y: 300}
  ]
}

// function to set a satellite position, and update the list
// of available posotions
function setSatPosition(sat) {
  pos = satPositions.available.pop()
  satPositions[sat.norad_cat_id] = pos
  return "translate(" + pos.x + "," + pos.y + ")"
}

function wiggleSatPosition(d) {
  pos = satPositions[d.norad_cat_id]

  result = { "start": ("translate(" + pos.x + "," + pos.y + ")"),
             "end": ("translate(" + pos.x + "," + (pos.y + 8) + ")") }

  return result
}

// function to add a satellite's position back to the list of available
// positions
function freeSatPosition(sat) {
  pos = satPositions[sat.norad_cat_id]
  delete satPositions[sat.norad_cat_id]

  satPositions.available.push(pos)
}

function drawSatellites(sats) {
  var boxSat = d3.select("#svg-content .layer-two")
                 .selectAll(".box-sat")
                 .data(sats, function(d) {return d.norad_cat_id})


  boxSat.exit()
        .attr("style", freeSatPosition)
        .remove()

  var group = boxSat.enter()
                    .append("g")
                    .attr("class", "box-sat")
                    .attr("id", d => "sat-" + d.norad_cat_id)
                    .attr("transform", setSatPosition)

  var text = group.append("text")
                  .attr("text-anchor", "middle")

  text.append("tspan")
      .attr("x", 50)
      .attr("dy", "2.3em")
      .attr("class", "name-sat")
      .text(d => d.name)

/*  text.append("tspan")
      .attr("x", 50)
      .attr("dy", "1.2em")
      .attr("class", "description-icon")
      .text("Origin Information")*/

  group.append("svg:image")
       .attr("class", "sat-icon")
       .attr("xlink:href", randomSatSprite)
       .attr("y", "1.2em")

  // initialize satellite wiggling
  group.transition()
       .ease(d3.easeQuad)
       .duration(d => 4000*Math.random() + 2000)
       .attr('transform', function (d) { return wiggleSatPosition(d).end })
       .on("end", repeatSatWiggle)


  function repeatSatWiggle(d) {
    d3.select("#sat-"+d.norad_cat_id)
      .transition()
      .ease(d3.easeQuad)
      .duration(3000)
      .attr('transform', function (d) { return wiggleSatPosition(d).start })
      .transition()
      .ease(d3.easeQuad)
      .duration(3000)
      .attr('transform', function (d) { return wiggleSatPosition(d).end })
      .on("end", repeatSatWiggle)
  }

}

// preset positions for ground stations
var stationPositions = {
  available: [
    {x: 425, y: 530},
    {x: 100,   y: 630},
    {x: 570, y: 630},
    {x: 270, y: 590},
    {x: 730, y: 600},
    {x: 125, y: 490}
  ]
}

// function to set a station position, and update the list of
// available posotions
function setStationPosition(station) {
  pos = stationPositions.available.pop()
  stationPositions[station.id] = pos
  return "translate(" + pos.x + "," + pos.y + ")"
}

// function to add a station's position back to the list of
// available positions
function freeStationPosition(station) {
  pos = stationPositions[station.id]
  delete stationPositions[station.id]

  stationPositions.available.push(pos)
}

function drawStations(stations) {

  var boxStation = d3.select("#svg-content .layer-two")
                     .selectAll(".box-station")
                     .data(stations, function(d) {return d.id})

  boxStation.exit()
            .attr("style", freeStationPosition)
            .remove()

  var group = boxStation.enter()
                        .append("g")
                        .attr("class", "box-station")
                        .attr("id", d => "station-" + d.id)
                        .attr("transform", setStationPosition)

  group.append("svg:image")
       .attr("xlink:href", "assets/dist/img/ground-station-active.png")

  var text = group.append("text")
                  .attr("text-anchor", "middle")
                  .attr("y", "4em")

  text.append("tspan")
      .attr("x", 50)
      .attr("dy", "1.8em")
      .attr("class", "name-station")
      .text(d => d.name)

  text.append("tspan")
      .attr("x", 50)
      .attr("dy", "1.6em")
      .attr("class", "description-icon")
      .text(d => d.lat.toFixed(2) + ', ' + d.lng.toFixed(2))

}

function getSatCenterPos(observation) {
  var cornerPos = satPositions[observation.norad_cat_id]

  return {
    x: cornerPos.x + 50,
    y: cornerPos.y + 75
  }
}

function getStationCenterPos(observation) {
  var cornerPos = stationPositions[observation.ground_station]

  var stationBoundingRect = d3.select("#station-" + observation.ground_station)
                          .node()
                          .getBoundingClientRect()

  return {
    x: cornerPos.x + 50,
    y: cornerPos.y + 50
  }
}

function drawTransmissionLines(observations) {

  var transmLine = d3.select("#svg-content .layer-one")
                     .selectAll(".transmission-line")
                     .data(observations, function(d) {return d.id})

  transmLine.exit()
            .remove()

  transmLineEnter = transmLine.enter()
                              .append("g")
                              .attr("class", "transmission-line")
                              .attr("id", d => "obs-" + d.id)
                              .append("line")
                              .attr("stroke", "black")
                              .attr("stroke-cap", "round")
                              .attr("stroke-width", "5")
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

var el_countdown = document.getElementById('countdown')

countdown(function (time) {
 // el_countdown.innerText = `${time}`
})

api(function () {
  // update background color
  var d = new Date()
  updateBgColor(d, window.state.weather.sunrise, window.state.weather.sunset)

  var carouselObservations = carousel.observations()
  var carouselSats = carousel.satellites()
  var carouselStations = carousel.stations()

  var prependFuture = carouselStations.filter(station => station.id === 86)
  console.log(prependFuture)
  if (prependFuture.length === 0) {
    carouselStations.unshift(window.state.stationsById['86'])
  }

  // update d3!
  drawStations(carouselStations)
  drawSatellites(carouselSats)
  drawTransmissionLines(carouselObservations)

  animateTransmissionLines()

  sync.setHighlightInterval(function() {
    var {station, satellite, observation} = carousel.highlighted()

    d3.select()

    d3.selectAll(".box-sat").classed("highlighted", false)
    d3.selectAll(".box-station").classed("highlighted", false)

    d3.select("#sat-" + satellite.norad_cat_id).classed("highlighted", true)
    d3.select("#station-" + station.id).classed("highlighted", true)

    d3.selectAll(".transmission-line line").transition()
                                           .duration(4000)
                                           .attr("stroke", "black")
                                           .attr("opacity", "0.2")
    d3.select("#obs-" + observation.id + " line").transition()
                                                 .duration(4000)
                                                 .attr("stroke", "#0C3")
                                                 .attr("opacity", "1")
  })

})
