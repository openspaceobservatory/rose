module.exports = observations

function observations (state, emitter) {
  state.observations = []

  emitter.on('observation:add', function (observation) {
    state.observations.push(observation)
    emitter.emit('render')
  })
}
