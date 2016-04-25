var $ = require('jquery');

//Sets the template information for each meetup
var setMeetupInfo = function(data, index){
  var labels = 'ABCDEFGHIJKLMNOP';
  var result = $('.meetup-template').clone();
  
  var title = result.find('.title a');
  title.attr('href', data.link);
  title.text(data.name);

  var members = result.find('.members');
  members.text("Members: " + data.members);

  var label = result.find('.label');
  label.text(labels[index]);

  var organizer = result.find('.organizer');
  organizer.next().text(data.organizer.name);

  var about = result.find('.about');
  about.html(data.description);

  return result;
};

module.exports = setMeetupInfo;