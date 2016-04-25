//Sets the location of the current meetup
getMeetupLoc = function(data){
  return {
    lat : data.lat,
    lng : data.lon
  };
};

module.exports = getMeetupLoc;