module.exports = stations

function stations (state, emitter) {
  state.stations = []

  emitter.on('station:add', function (station) {
    state.stations.push(station)
    emitter.emit('render')
  })
}
