module.exports = updateBackgroundColor

function updateBackgroundColor(sunrise, sunset) {
  // sunrise & sunset: {"hour": "XX", "minute": "YY"}

  // format sunrise & sunset uniformally
  var sunriseTime =  sunrise.hour*60*60 + sunrise.minute*60
  var sunsetTime =  sunset.hour*60*60 + sunset.minute*60
  var middayTime = (sunriseTime + sunsetTime)/2

  var d = new Date()
  var curTime = d.getHours()*60*60 + d.getMinutes()*60 + d.getSeconds()

  var body = document.getElementsByTagName("body")[0]

  if (curTime >= sunriseTime && curTime < middayTime) {
    body.classList = ["sunrise"]
  } else if (curTime >= middayTime && curTime < sunsetTime) {
    body.classList = ["midday"]
  } else {
    body.classList = ["sunset"]
  }
}
