$(function(){
  var map, userLoc; 

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
      errorMsg.html("Error trying to retrive location. Check your internet connection");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  function getMeetups(id){
    var opts = { 
      lon: userLoc.lng,
      lat: userLoc.lat,
      radius: 30,
      category: id,
      page: 15
    };
  
    $.ajax({
      url: "https://api.meetup.com/find/groups",
      data: opts,
      dataType: "jsonp",
      type: "GET",
    })
    .done(function(data){
      console.log(data);
    })
    .fail(function(error){

    });
  }

  getUserLocation();

  $('.search-form').submit(function(e){
    e.preventDefault();
    var catId = $('.category').val();
    if(catId === null) {return;}
    //search for meetups with the given category
    getMeetups(catId);
  });
});