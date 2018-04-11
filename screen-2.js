var api = require('./lib/api')
var countdown = require('./lib/countdown')
var updateBgColor = require('./lib/background-color')

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
		x = 1024 // installation view width
		y = 768 - 50 // installation view height - (marquee height)

var el_countdown = d.getElementById('countdown')

countdown(function (time) {
  el_countdown.innerText = `Time until new satellite data: ${time}`
})

// Axes outer margin
var axesMargin = 200;

var apiCounter = 0

api(function () {
	// update d3!
	var stationNames = window.state.stations.map(x => x["name"])
	var xScale = initXScale(stationNames)

	var satelliteCatIds = window.state.satellites.map(x => x["norad_cat_id"])
	var yScale = initYScale(satelliteCatIds)

	function initXScale (cats) {
		return d3.scaleBand()
						 .domain(cats)
						 .range([axesMargin + 18, x-axesMargin - 18])
	}

	function initYScale (cats) {
		return d3.scaleBand()
						 .domain(cats)
						 .range([axesMargin, y-axesMargin])
	}

	// "d3 app"
	var obsScale = d3.scaleLinear()
									 .domain([102800000,142800000]) // 48 hrs in milliseconds
									 .range([{color: "#fff", opacity: 1},
													 {color: "#fff", opacity: 0}])
// Axes
	svgContainer.selectAll(".station")
							.data(window.state.stations)
							.enter()
							.append("circle")
							.attr("class", "station")
							.attr("r", 3)
							.attr("fill", "#fff")
							.attr("cx", d => xScale(d.name))
							.attr("cy", y-axesMargin - 4)

	svgContainer.selectAll(".satellite")
							.data(window.state.satellites)
							.enter()
							.append("circle")
							.attr("class", "satellite")
							.attr("r", 1)
							.attr("fill", "#fff")
							.attr("cx", axesMargin)
							.attr("cy", d => yScale(d.norad_cat_id))

// Text label for the X axis
svgContainer.append("text")
	.attr("transform",
				"translate(" + (x/2) + " ," +
											 (y - axesMargin/3) + ")")
	.style("text-anchor", "middle")
	.attr("fill", "#fff")
	.attr('class','description-axis')
	.text("Ground Stations")

// Text label for the Y axis
svgContainer.append("text")
	.attr("transform", "translate(0,0)")
	.attr("transform", "rotate(-90)")
	.attr("y", axesMargin/3)
	.attr("x", 0 - y/2)
	.style("text-anchor", "middle")
	.attr("fill", "#fff")
	.attr('class','description-axis')
	.text("Satellites");


// Only redrawn aspect on data updates
svgContainer.selectAll(".observation")
	.data(window.state.observations)
	.enter()
	.append("circle")
	.attr("class", "observation")
	.attr("fill", d => obsColor(d.end).color)
	.attr("opacity", d => obsColor(d.end).opacity)
	.attr("cx", d => xScale(d.station_name))
	.attr("cy", d => yScale(d.norad_cat_id))
	.attr("r", 0)
	.transition()
	.ease(d3.easeElastic)
	.duration(2000)
	.attr("r", 3)

	function obsColor(obsTime) {
		var ellapsedMs = Date.now() - Date.parse(obsTime)

		return obsScale(ellapsedMs)
	}
})

// initialise d3!
var svgContainer = d3.select("#content")
										 .append("svg")
										 .attr("class", "battleship")
										 .attr("width", x)
										 .attr("height", y);
