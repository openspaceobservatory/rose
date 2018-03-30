module.exports = example

function example (state, emitter) {
  state.example = {}
  state.example.property = false

  emitter.on('example:event', function) {
    state.example.property = !state.example.property
    emitter.emit('render')
  }
}
