var choo = require('choo')
var app = choo()

app.use(require('./state/observations'))
app.use(require('./state/satellites'))
app.use(require('./state/stations'))

app.route('/', require('./templates/example'))

document.body.appendChild(app.start())
