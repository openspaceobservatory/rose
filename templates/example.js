var html = require('choo/html')

module.exports = example

function example (state, emit) {
  return html`
    <body>
      <div>Let's go to space!</div>
    </body>
  `
}
