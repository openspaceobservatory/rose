exports.name = function (str) {
  var split = str.split(' ')
  if (split.length > 2) {
    return `${split[0]} ${split[1]}`
  } else {
    return str
  }
}
