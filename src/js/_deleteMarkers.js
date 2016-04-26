//Deletes the markers on the map if any are present
deleteMarkers = function(markers) {
  markers.forEach(value => {
  	value.setMap(null);
  });
};

module.exports = deleteMarkers;