//Adding breeds from the list
//https://pacific-stream-9205.herokuapp.com/puppies.json
var Puppyshelter = {

  Puppy: function(sample){
    id: sample.id;
    name: sample.name;
    breed: sample.breed;
    created_at: sample.created_at;
    url: sample.url;
  },

  puppies: [],
  breeds: ["Poodle","Rottweiler","Sheepdog"],

  buildForm: function(){
    for(var i=0; i<breeds.length; i++){

      $('select').append('<option value="'+breeds[i]+'">'+breeds[i]+'</option>')  
    }
  },

  buildPuppies: function(json){
    // var text = json.responseText
    var textParsed = json  //JSON.parse(text);

    for(var i=0; i<textParsed.length; i++){
      
      Puppyshelter.puppies.push(new Puppyshelter.Puppy(textParsed[i]))
    }
    
    Puppyshelter.showList();
  },

  getPuppies: function(){
    $.ajax({
        type: 'GET',
        url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
        dataType: 'json',
        success: function(json){
            Puppyshelter.buildPuppies(json);
          }   
        })
  },

  addPuppy: function(sample){
    $.post('https://pacific-stream-9205.herokuapp.com/puppies.json', {name: sample.name, breed_id: sample.id}.to_json)
  },

  removePuppy: function(sample){
    $.post('https://pacific-stream-9205.herokuapp.com/puppies/'+sample.id+'.json')
  },

 
  showList: function(){
    var pups = Puppyshelter.puppies;
    console.log(pups)
    var sample = undefined;
    for(var i=0; i< pups.length; i++){
      
      $('#puppy-list').append('<li>'+pups.name+'('+pups.breeed+'). created at'+pups.created_at+'--</li><a href="#">adopt</a>')
      
    }
  },



};

$(document).ready(function(){
    Puppyshelter.getPuppies();
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