var html = require('choo/html')

module.exports = battleship

function xScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([50, 600]);
}

function yScale (cats) {
  return d3.scaleBand()
           .domain(cats)
           .range([10, 800]);
}



function battleship (state, emit) {

  stationNames = state.stations.map(x => x["name"])
  xScale = xScale(stationNames)

  satelliteCatIds = state.satellites.map(x => x["norad_cat_id"])
  yScale = yScale(satelliteCatIds)

  svgContainer = d3.select("body")
                   .append("svg")
                   .attr("class", "battleship")
                   .attr("width", 640)
                   .attr("height", 850)

  svgContainer.selectAll(".station")
              .data(state.stations)
              .enter()
              .append("circle")
              .attr("class", "station")
              .attr("r", 3)
              .attr("fill", "#26A")
              .attr("cx", d => xScale(d.name))
              .attr("cy", 810)

  svgContainer.selectAll(".satellite")
              .data(state.satellites)
              .enter()
              .append("circle")
              .attr("class", "satellite")
              .attr("r", 1)
              .attr("fill", "#888")
              .attr("cx", 25)
              .attr("cy", d => yScale(d.norad_cat_id))

  svgContainer.selectAll(".observation")
              .data(state.observations)
              .enter()
              .append("circle")
              .attr("class", "observation")
              .attr("r", 2)
              .attr("fill", "#b93")
              .attr("cx", d => xScale(d.station_name))
              .attr("cy", d => yScale(d.norad_cat_id))


  return html`
    <body>
    </body>
  `
}
