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

// Set widths
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    contentWidth = d.getElementById('content').clientWidth
    contentHeight = d.getElementById('content').clientHeight

var el_countdown = d.getElementById('countdown')

countdown(function (time) {
  //el_countdown.innerText = `Time until new satellite data: ${time}`
  el_countdown.innerText = `${time}`
})

// Axes outer margin
var axesMargin = 200;

var svgContainer = d3.select('svg')
var d3Initialized = false
var xScale, yScale

function initXScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([axesMargin + 18, contentWidth - axesMargin - 18])
}

function initYScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([axesMargin, contentHeight - axesMargin])
}

function initializeD3() {
  d3Initialized = true

  // set scales
  var stationNames = window.state.stations.map(x => x["name"])
  xScale = initXScale(stationNames)

  var satelliteCatIds = window.state.satellites.map(x => x["norad_cat_id"])
  yScale = initYScale(satelliteCatIds)

  // Axes
  //svgContainer.selectAll(".station")
  //            .data(window.state.stations)
  //            .enter()
  //            .append("circle")
  //            .attr("class", "station")
  //            .attr("r", 3)
  //            .attr("fill", "#fff")
  //            .attr("cx", d => xScale(d.name))
  //            .attr("cy", y-axesMargin - 4)

  //svgContainer.selectAll(".satellite")
  //            .data(window.state.satellites)
  //            .enter()
  //            .append("circle")
  //            .attr("class", "satellite")
  //            .attr("r", 1)
  //            .attr("fill", "#fff")
  //            .attr("cx", axesMargin)
  //            .attr("cy", d => yScale(d.norad_cat_id))
}

function observationRadius(observation) {
  if (carousel.highlighted().observation == observation) {
    return "8px"
  } else if (carousel.observations().includes(observation)) {
    return "5px"
  } else {
    return "3px"
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
                    .delay(d => 1000*Math.random())
                    .duration(d => (500 + 2500*Math.random()))
                    .attr("r", 3)

  // anything that we want to apply to (new as well as existing) observations
  // should go here
  d3Obs.merge(d3ObsEnter)
      .classed("inCarousel", setInCarouselClass)

  sync.setHighlightInterval(function() {
    var {station, satellite} = carousel.highlighted()

    // add station & satelite sprites here
    d3.selectAll(".observation")
      .classed("highlighted", setHighlightedClass)
      .attr("r", observationRadius)

    var x = xScale(carousel.highlighted().station.name)
    var y = yScale(carousel.highlighted().satellite.norad_cat_id)

    var outlineRadius = 30

    // remove previous styling
    svgContainer.selectAll("line").remove()
    svgContainer.selectAll(".highlighted-outline").remove()
    svgContainer.selectAll(".highlighted-pulse").remove()

    // add vertical axis
    svgContainer.append("line")
                .attr("stroke", "#FFF")
                .attr("stroke-width", 2)
                .attr("stroke-opacity", 0.7)
                .attr("x1", x)
                .attr("y1", y + outlineRadius + 5)
                .attr("x2", x)
                .attr("y2", contentHeight - 155)

    // add horizontal axis
    svgContainer.append("line")
                .attr("stroke", "#FFF")
                .attr("stroke-opacity", 0.7)
                .attr("stroke-width", 2)
                .attr("x1", x - outlineRadius - 5)
                .attr("y1", y)
                .attr("x2", 150)
                .attr("y2", y)

    // add highlighted outline
    svgContainer.append("circle")
                .attr("class", "highlighted-outline")
                .attr("stroke", "#FFF")
                .attr("stroke-width", 2)
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
                .attr("r", 8)
                .attr("cx", x)
                .attr("cy", y)


    d.getElementById('station').style = `left: ${Math.round(0.99 * x) - 69}px;`
    d.getElementById('sat').style = `top: ${Math.round(0.99 * y) - 46}px;`

    d.getElementById('station-name').innerText = nameConcat(station.name)
    d.getElementById('sat-name').innerText = nameConcat(satellite.name)
  })
})

function nameConcat (str) {
  var split = str.split(' ')
  if (split.length > 2) {
    return `${split[0]} ${split[1]}`
  } else {
    return str
  }
}
