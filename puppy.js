//Adding breeds from the list
//https://pacific-stream-9205.herokuapp.com/puppies.json
var Puppyshelter = {

  var puppies = [];
  var breeds = ["Poodle","Rottweiler","Sheepdog"];

  for(var i=0; i<breeds.length; i++){
    $('select').append('<option value="'+breed+'">'+breed+'</option>')  
  } 

  $.get("https://pacific-stream-9205.herokuapp.com/puppies.json",
        )

  //Set callback on button to add a puppies
  //Set promise to add puppy in the list of puppies
}

var requestJson  = function(){
      $.ajax( {
        url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
        data: { },
        type: "GET",
        dataType : "json",
      });
    }