var Timer = require('time-counter')

module.exports = countdown

function countdown (cb) {
  var now = new Date()
  var delay = 60000 - now % 60000

  var timer = new Timer({
    direction: 'down',
    startValue: (delay - (delay % 1000)) / 1000
  })

  timer.on('change', function () {
    if (timer.time === '0:00') countdown(cb)
    cb(timer.time)
  })

  setTimeout(function () {
    timer.start()
  }, delay % 1000)
}
