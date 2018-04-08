module.exports = isImage

function isImage (ext) {
  var imageTypes = {
    'png': true,
    'jpeg': true,
    'jpg': true
  }

  var check = imageTypes[ext.toLowerCase()]
  return !!check
}
