module.exports = {
  setQueryInterval: setQueryInterval,
  setHighlightInterval: setHighlightInterval
}

function sync (interval, cb) {
  var now = new Date()
  var delay = interval - now % interval

  cb()
  setTimeout(function () {
    cb()
    setInterval(cb, interval)
  }, delay)
}

function setQueryInterval(cb) {
  sync(60000, cb)
}

function setHighlightInterval(cb) {
  var highlightInterval = 10000

  function syncCb() {
    window.state.highlightIndex = Math.floor(Date.now() / highlightInterval)
    cb()
  }

  sync(highlightInterval, syncCb)
}
