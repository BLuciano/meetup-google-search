$(function(){
  var userLoc =  getUserLocation();
  
});

//Retrieves the user location
function getUserLocation(){
  var errorMsg = $(".error"), location = [];  
  
  if(!navigator.geolocation){
    errorMsg.html("Sorry! Geolocation is not supported in your browser");
    return;
  }

  function success(position){
    location.push(
    {
      "lat" : position.coords.latitude
    },
    {
      "long" : position.coords.longitude
    });
    return location;
  }
  function error(){
    errorMsg.html("Error trying to retrive location. Check your internet connection");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}
