module.exports = updateBackgroundColor

function updateBackgroundColor(d, sunrise, sunset) {
  // sunrise & sunset: {"hour": "XX", "minute": "YY"}
  // d: Date object => new Date()

  // format sunrise & sunset uniformally
  var sunriseTime =  sunrise.hour*60*60 + sunrise.minute*60
  var sunsetTime =  sunset.hour*60*60 + sunset.minute*60
  var middayTime = (sunriseTime + sunsetTime)/2

  var curTime = d.getHours()*60*60 + d.getMinutes()*60 + d.getSeconds()

  var body = document.getElementsByClassName("installation-view")[0]

  if (curTime >= sunriseTime && curTime < middayTime) {
    body.classList = ["sunrise installation-view"]
  } else if (curTime >= middayTime && curTime < sunsetTime) {
    body.classList = ["midday installation-view"]
  } else {
    body.classList = ["sunset installation-view"]
  }
}
