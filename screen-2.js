var api = require('./lib/api')
var countdown = require('./lib/countdown')
var updateBgColor = require('./lib/background-color')
var carousel = require('./lib/carousel')
var sync = require('./lib/sync')
var concat = require('./lib/concat')

window.state = {
  observations: [],
  satellites: [],
  satellitesById: {},
  satellitesByName: {},
  stations: [],
  stationsById: {},
  stationsByName: {},
  flags: {apiCalled: false}
}

// Set widthsvar w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    contentWidth = d.getElementById('content').clientWidth
    contentHeight = d.getElementById('content').clientHeight



// =============================================================================
// Graphics Variables
// =============================================================================

// dot sizes
var largeObsSize = 20
var medObsSize = 8
var smallObsSize = 5

// outline variables
var outlineRadius = 35
var outlineAxisOffset = 10
var outlineColor = "#FAFDCB"
var outlineThickness = 2
var outlineOpacity = 1

// battleship dimensions
var battleshipWidth = 700
var battleshipHeight = 450

var xOffset = 50
var yOffset = -40

// time rang for tiny dots
var maxTimeRange = 8*60*60*1000 // in milliseconds
var smallObsScale = d3.scaleLinear()
                      .domain([0,maxTimeRange])
                      .range([smallObsSize,0])

// =============================================================================

var el_countdown = d.getElementById('countdown')

countdown(function (time) {
  //el_countdown.innerText = `Time until new satellite data: ${time}`
  //el_countdown.innerText = `${time}`
})

// Axes outer margin
var axesMargin = 200;

var svgContainer = d3.select('svg')
var d3Initialized = false
var xScale, yScale

function initXScale (cats) {
  xMin = (contentWidth - battleshipWidth)/2 + xOffset
  xMax = (contentWidth + battleshipWidth)/2 + xOffset

  yMin = (contentHeight - battleshipHeight)/2 + yOffset
  yMax = (contentHeight + battleshipHeight)/2 + yOffset

  return d3.scaleBand()
           .domain(cats)
           .range([xMin, xMax])
}

function initYScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([yMin, yMax])
}

function initializeD3() {
  d3Initialized = true

  // set scales
  var stationNames = window.state.stations.map(x => x["name"])
  xScale = initXScale(stationNames)

  var satelliteCatIds = window.state.satellites.map(x => x["norad_cat_id"])
  yScale = initYScale(satelliteCatIds)

}

function observationRadius(observation) {
  if (carousel.highlighted().observation == observation) {
    return largeObsSize + "px"
  } else if (carousel.observations().includes(observation)) {
    return medObsSize + "px"
  } else {
    var start = Date.parse(observation.start)
    var now = Date.now()

    var size = Math.max(0,smallObsScale(now - start))

    return size + "px"
  }
}

function setHighlightedClass(observation) {
  return carousel.highlighted().observation == observation
}

function setInCarouselClass(observation) {
  return carousel.observations().includes(observation)
}

api(function () {
  if (!d3Initialized) initializeD3()

  // update background color
  var date = new Date()
  updateBgColor(date, window.state.weather.sunrise, window.state.weather.sunset)


  // "d3 app"
  var observations = window.state.observations.slice().reverse()

  // what to do for observations that are already present in the svg
  var d3Obs = svgContainer.selectAll(".observation")
                          .data(observations)

  // what to do for observations that are no longer in the dataset
  d3Obs.exit().remove()

  // what to do for new observations
  d3ObsEnter = d3Obs.enter()
                    .append("circle")
                    .attr("class", "observation")
                    .attr("cx", d => xScale(d.station_name))
                    .attr("cy", d => yScale(d.norad_cat_id))
                    .attr("fill", "#FFF")
                    .attr("r", 0)
                    .transition()
                    .ease(d3.easeElastic)
                    .delay(d => 5000*Math.random())
                    .duration(d => (500 + 2500*Math.random()))
                    .attr("r", observationRadius)

  // anything that we want to apply to (new as well as existing) observations
  // should go here
  d3Obs.merge(d3ObsEnter)
      .classed("inCarousel", setInCarouselClass)

  if (!window.state.flags.apiCalled) {
    window.state.flags.apiCalled = true

    sync.setHighlightInterval(function() {
      var {station, satellite} = carousel.highlighted()

      // add station & satelite sprites here
      d3.selectAll(".observation")
        .classed("highlighted", setHighlightedClass)

      d3.selectAll(".observation:not(.highlighted)")
        .transition()
        .ease(d3.easeBounce)
        .duration(3000)
        .attr("r", observationRadius)

      d3.selectAll(".observation.highlighted")
        .transition()
        .ease(d3.easeElastic)
        .duration(5000)
        .attr("r", observationRadius)

      var x = xScale(station.name)
      var y = yScale(satellite.norad_cat_id)


      // remove previous styling
      svgContainer.selectAll("line").remove()
      svgContainer.selectAll(".highlighted-outline").remove()
      svgContainer.selectAll(".highlighted-pulse").remove()

      // add vertical axis
      svgContainer.append("line")
                  .attr("stroke", outlineColor)
                  .attr("stroke-width", outlineThickness)
                  .attr("x1", x)
                  .attr("y1", y + outlineRadius + outlineAxisOffset)
                  .attr("x2", x)
                  .attr("y2", contentHeight - 155)

      // add horizontal axis
      svgContainer.append("line")
                  .attr("stroke", outlineColor)
                  .attr("stroke-width", outlineThickness)
                  .attr("x1", x - outlineRadius - outlineAxisOffset)
                  .attr("y1", y)
                  .attr("x2", 150)
                  .attr("y2", y)

      // add highlighted outline
      svgContainer.append("circle")
                  .attr("class", "highlighted-outline")
                  .attr("stroke", outlineColor)
                  .attr("stroke-width", outlineThickness)
                  .attr("fill", "none")
                  .attr("r", outlineRadius)
                  .attr("cx", x)
                  .attr("cy", y)

      // add highlighted pulse
      svgContainer.append("circle")
                  .attr("class", "highlighted-pulse")
                  .attr("stroke", "#FFF")
                  .attr("stroke-width", 2)
                  .attr("fill", "#FFF")
                  .attr('style', "transform-origin: " + x + "px " + y + "px;")
                  .attr("r", largeObsSize)
                  .attr("cx", x)
                  .attr("cy", y)


      d.getElementById('station').style = `left: ${Math.round(0.99 * x) - 69}px;`
      d.getElementById('sat').style = `top: ${Math.round(0.99 * y) - 46}px;`

      d.getElementById('station-name').innerText = concat.name(station.name)
      d.getElementById('sat-name').innerText = concat.name(satellite.name)
    })
  }
})
