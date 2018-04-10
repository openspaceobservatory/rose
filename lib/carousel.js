module.exports = {
  observations: carouselObservations,
  stations: carouselStations,
  satellites: carouselSatellites,
  highlighted: carouselHighlighted
}

var carouselSize = 5
var highlightedIndex = 0

function carouselObservations() {
  return window.state.observations.slice(0,carouselSize)
}

function carouselStations() {
  return carouselObservations().map(function(obs) {
    //map to satellite id
    return window.state.satellitesById[obs.norad_cat_id]
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })
}

function carouselSatellites() {
  return carouselObservations().map(function(obs) {
    //map to ground_stations
    return window.state.stationsById[obs.ground_station]
  }).filter(function (v, i, self) {
    // filter for unique values
    return self.indexOf(v) === i
  })
}

function carouselHighlighted() {
  var obs = carouselObservations()[highlightedIndex]

  return {
    observation: obs,
    station: window.state.stationsById[obs.ground_station],
    satellite: window.state.satellitesById[obs.norad_cat_id]
  }
}
