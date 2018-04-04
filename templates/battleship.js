var html = require('choo/html')

module.exports = battleship

function initXScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([50, 600])
}

function initYScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([10, 800])
}

var obsScale = d3.scaleLinear()
                 .domain([102800000,142800000]) // 48 hrs in milliseconds
                 .range([{color: "#0A0", opacity: 1},
                         {color: "#309", opacity: 0}])

function obsColor(obsTime) {
  var ellapsedMs = Date.now() - Date.parse(obsTime)

  return obsScale(ellapsedMs)
}

function battleship (state, emit) {

  var stationNames = state.stations.ordered.map(x => x["name"])
  var xScale = initXScale(stationNames)

  var satelliteCatIds = state.satellites.ordered.map(x => x["norad_cat_id"])
  var yScale = initYScale(satelliteCatIds)

  var svgContainer = d3.select("body")
                       .append("svg")
                       .attr("class", "battleship")
                       .attr("width", 640)
                       .attr("height", 850)

  svgContainer.selectAll(".station")
              .data(state.stations.ordered)
              .enter()
              .append("circle")
              .attr("class", "station")
              .attr("r", 3)
              .attr("fill", "#26A")
              .attr("cx", d => xScale(d.name))
              .attr("cy", 810)

  svgContainer.selectAll(".satellite")
              .data(state.satellites.ordered)
              .enter()
              .append("circle")
              .attr("class", "satellite")
              .attr("r", 1)
              .attr("fill", "#888")
              .attr("cx", 25)
              .attr("cy", d => yScale(d.norad_cat_id))

  svgContainer.selectAll(".observation")
              .data(state.observations.ordered)
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

  return html`
    <body>
    </body>
  `
}
