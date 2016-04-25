//Deletes the markers on the map if any are present
deleteMarkers = function(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

module.exports = deleteMarkers;