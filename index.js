var choo = require('choo')
var html = require('choo/html')

var app = choo()

app.route('/', main)

function main (state, emit) {
  return html`
    <body>
      <div>Testing 123</div>
    </body>
  `
}

if (module.parent) {
  module.exports = app
} else {
  app.mount('body')
}
