module.exports = {
  observations: carouselObservations,
  stations: carouselStations,
  satellites: carouselSatellites,
  highlighted: carouselHighlighted
}

var carouselSize = 5

function carouselObservations() {
  return window.state.observations.slice(0,carouselSize)
}

function carouselSatellites() {
  return carouselObservations().map(function(obs) {
    //map to satellite
    return window.state.satellitesById[obs.norad_cat_id]
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })
}

function carouselStations() {
  return carouselObservations().map(function(obs) {
    //map to ground_stations
    return window.state.stationsById[obs.ground_station]
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })
}

function carouselHighlighted() {

  highlightIndex = window.state.highlightIndex || 0

  var index = highlightIndex % carouselSize

  var obs = carouselObservations()[index]

  return {
    observation: obs,
    station: window.state.stationsById[obs.ground_station],
    satellite: window.state.satellitesById[obs.norad_cat_id]
  }
}
