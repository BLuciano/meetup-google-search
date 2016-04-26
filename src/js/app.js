var $ = require('jquery');
var setMeetupInfo = require('./_setMeetUp');
var getMeetupLoc = require('./_getMeetupLoc');
var googleMarkerIt = require('./_googleMarker');
var deleteMarkers = require('./_deleteMArkers');

$(function(){
  var map, userLoc, markers = []; 

  //Displays the map based on the current user location
  function initMap(location){
    var map = new google.maps.Map(document.getElementById('map'),{
      center : location,
      scrollwheel : false,
      zoom: 10
    });
    //return ref to map to add markers later
    return map;
  }

  //Retrieves the user location
  function getUserLocation(){
    var errorMsg = $(".error"), location = [];  
    
    if(!navigator.geolocation){
      errorMsg.html("Sorry! Geolocation is not supported in your browser");
      return;
    }

    function success(position){
      userLoc = {
        "lat" : position.coords.latitude,
        "lng" : position.coords.longitude
      };
      
      //Once location is set show map
      map = initMap(userLoc); 
    }
    function error(){
      errorMsg.html("Error trying to retrive location. Check your internet settings or connection");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  //Uses the given category id to search for nearby meetups via ajax
  function getMeetups(id){
    var meetupLoc, meetupDesc;
    $('.meetup-results').html('');
    deleteMarkers(markers);
    markers = [];

    var opts = { 
      lon: userLoc.lng,
      lat: userLoc.lat,
      radius: 30,
      key : '1164a772e5b1343e4b264e2f36e3e',
      category: id,
      page: 16
    };

    $.ajax({
      url: "https://api.meetup.com/find/groups",
      data: opts,
      dataType: "jsonp",
      type: "GET",
    })
    .done(data => {
      $.each(data.data, function(index, value){
        //Set the template information
        meetupDesc = setMeetupInfo(value, index);
        //Set the location of the meetup
        meetupLoc = getMeetupLoc(value);
        //Attach results to the dom
        $('.meetup-results').append(meetupDesc[0]);
        //Attach marker to the map and saves it to markers array.
        markers.push(googleMarkerIt(map, meetupLoc, value.name, index));
      });
    })
    .fail(error => {
      errorMsg.html("Error trying to retrieve Meetups information.");
    });
  }

  getUserLocation();

  //Sets submit listener for form
  $('.search-form').submit(function(e){
    e.preventDefault();
    var catId = $('.category').val();

    if(catId === null) {return;}

    //search for meetups with the given category
    getMeetups(catId);
  });
});