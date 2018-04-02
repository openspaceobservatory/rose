var choo = require('choo')
var devtools = require('choo-devtools')

var app = choo()

app.use(require('./state/observations'))
app.use(require('./state/stations'))
app.use(require('./state/satellites'))

if (process.env.NODE_ENV !== 'production') {
  app.use(devtools())
}

app.route('/', require('./templates/battleship'))

document.body.appendChild(app.start())
