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
      location = {
        "lat" : position.coords.latitude,
        "lng" : position.coords.longitude
      };
      
      //Once location is set show map
      map = initMap(location); 
      return location;
    }
    function error(){
      errorMsg.html("Error trying to retrive location. Check your internet connection");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  userLoc = getUserLocation(); 
});