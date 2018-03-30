var choo = require('choo')
var app = choo()

app.use(require('./state/example'))

app.route('/', require('./templates/example'))

if (module.parent) {
  module.exports = app
} else {
  app.mount('body')
}
