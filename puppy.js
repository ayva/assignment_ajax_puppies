//Adding breeds from the list
//https://pacific-stream-9205.herokuapp.com/puppies.json
var Puppyshelter = (function(){

  var Puppy = function(sample){
    id: sample.id,
    name: sample.name,
    breed: sample.breed,
    created_at: sample.created_at,
    url: sample.url
  }

  var puppies = [];
  var breeds = ["Poodle","Rottweiler","Sheepdog"];

  for(var i=0; i<breeds.length; i++){
    $('select').append('<option value="'+breed+'">'+breed+'</option>')  
  } 

  function getPuppies(){
    var response = $.get('https://pacific-stream-9205.herokuapp.com/puppies.json')
    var text = response.responseText
    var puppies = JSON.parse(text);
    for(var i=0; i<puppies.length; i++){
      puppies.push(new Puppy(puppies[i])
    } 
    console.log(puppies)
  }

  function addPuppy(sample){
    $.post('https://pacific-stream-9205.herokuapp.com/puppies.json', {name: sample.name, breed_id: sample.id}.to_json)
  }

  function removePuppy(sample){
    $.post('https://pacific-stream-9205.herokuapp.com/puppies/'+sample.id+'.json')
  }

  function showList(){
    var sample = undefined
    for(var i=0; i<puppies.length; i++){
      sample=puppies[i];
      $('#puppy-list').append('<li>'+sample.name+'('+sample.breeed+'). created at'+sample.created_at+'--</li><a href="#">adopt</a>')
      
    }
  }


})();

// var requestJson  = function(){
//       $.ajax( {
//         url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
//         data: { },
//         type: "GET",
//         dataType : "json",
//       });
//     }