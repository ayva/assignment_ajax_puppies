
var Puppyshelter = {

  puppy: function(sample){
    id: sample.id;
    name: sample.name;
    breed: sample.breed;
    created_at: sample.created_at;
    url: sample.url;
  },

  form: $("#form"),
  breeds: [],

  buildForm: function(){ 
    $.ajax({
    type: 'GET',
    url: 'https://pacific-stream-9205.herokuapp.com/breeds.json',
    dataType: 'json',
    success: function(json){ 
      Puppyshelter.breeds = json;
      console.log(Puppyshelter.breeds[1])
      for(var i=0; i<Puppyshelter.breeds.length; i++){
        $('select').append('<option value="'+Puppyshelter.breeds[i].name+'">'+Puppyshelter.breeds[i].name+'</option>')  
      }
      }   
    })

  },

  findBreedId: function(breedName){
      for(var i=0; i<Puppyshelter.breeds.length; i++){
        if (Puppyshelter.breeds[i].name === breedName) {return Puppyshelter.breeds[i].id;}
      }
      return "no breed found";
  },

  getPuppies: function(){
    $.ajax({
        type: 'GET',
        url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
        dataType: 'json',
        success: function(json){
            for(var i=json.length-1; i>=0; i--){
              $('#puppy-list').append('<li id="'+json[i].id+'">'+json[i].name+'('+json[i].breed.name+'). added on '+ Date.parse(json[i].created_at)+'--<a id="'+json[i].id+'" href="#">adopt</a></li> ')
            }
          }   
        })
  },

  appendPuppy: function(){
    $.ajax({
        type: 'GET',
        url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
        dataType: 'json',
        success: function(json){
            var i=json.length-1
              $('#puppy-list').prepend('<li id="'+json[i].id+'">'+json[i].name+'('+json[i].breed.name+'). added on '+ Date.parse(json[i].created_at)+'--<a class="adopt" id="'+json[i].id+'" href="#">adopt</a></li> ')
            
          }   
        })
  },

  addPuppy: function(puppyName, breedId){  
    
    $.ajax({
      method: "POST",
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      data: JSON.stringify({breed_id: breedId, name: puppyName}),
      dataType: "json",
      contentType: "application/json",
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
      type: "POST",
      async: true
      }) 
  },

  removePuppy: function(id){
    $.ajax({
        type: 'DELETE',
        url: 'https://pacific-stream-9205.herokuapp.com/puppies/'+id+'.json',
        dataType: 'json',
        success: function(json){ 
          console.log("Puppy was deleted");
          $("#"+id).remove();},
      })

  },

};

function setEvents(){

  $("#button").on("click", function(evt){
    evt.preventDefault();
    //$("form").serializeArray(); doesn't work for dropdown
    var PuppyName = $("#name").val();
    
    var PuppyBreed = $("#breed").val();
    
    var breedId = Puppyshelter.findBreedId(PuppyBreed);

    Puppyshelter.addPuppy(PuppyName, breedId);
    Puppyshelter.appendPuppy();}
    );

  $('body').on("click", ".adopt", function(evt){
    evt.preventDefault();
    var puppy_id = $(this).attr("id")
    //$($(this)[0].parentElement).attr("id")
    Puppyshelter.removePuppy(puppy_id);

  });

  $('body').on("click", "#refresh-list", function(evt){
    $('#puppy-list').children().remove();
    Puppyshelter.getPuppies();
  })

  
}
$(document).ready(function(){
    Puppyshelter.getPuppies();
    Puppyshelter.buildForm();
    setEvents();


});

// var requestJson  = function(){
//       $.ajax( {
//         url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
//         data: { },
//         type: "GET",
//         dataType : "json",
//       });
//     }

 // document.getElementById("submit").addEventListener("click", showList);