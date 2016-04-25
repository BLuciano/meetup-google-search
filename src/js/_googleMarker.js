//Sets the marker of the current meetup on the map
googleMarkerIt = function(map, location, title, index){
  var labels = 'ABCDEFGHIJKLMNOP';
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    label: labels[index],
    animation: google.maps.Animation.DROP,
    title: title
  });
  return marker;
};

module.exports = googleMarkerIt;