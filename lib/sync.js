module.exports = sync

function sync (interval, cb) {
  var now = new Date()
  var delay = interval - now % interval

  cb()
  setTimeout(function () {
    cb()
    setInterval(cb, interval)
  }, delay)
}
