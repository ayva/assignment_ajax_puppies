//Adding breeds from the list
//https://pacific-stream-9205.herokuapp.com/puppies.json
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
      breeds = json;
      
      for(var i=0; i<breeds.length; i++){
        $('select').append('<option value="'+breeds[i].name+'">'+breeds[i].name+'</option>')  
      }
      }   
    })

  },

  // buildPuppies: function(json){
  //   // var text = json.responseText
  //   //var textParsed = json  //JSON.parse(text);

  //   for(var i=0; i<json.length; i++){
  //     console.log(json[i].name)
  //     Puppyshelter.puppies.push(new Puppyshelter.puppy(json[i]))
  //   }
    
  //   Puppyshelter.showList();
  // },

  getPuppies: function(){
    $.ajax({
        type: 'GET',
        url: 'https://pacific-stream-9205.herokuapp.com/puppies.json',
        dataType: 'json',
        success: function(json){
            //Puppyshelter.buildPuppies(json);
           // console.log(json)
            for(var i=0; i<json.length; i++){
              $('#puppy-list').append('<li id="'+json[i].id+'">'+json[i].name+'('+json[i].breed.name+'). added on '+ Date.parse(json[i].created_at)+'--<a id="'+json[i].id+'" href="#">adopt</a></li> ')
            }
          }   
        })
  },

  addPuppy: function(formData){  
    console.log(formData[0])  
    $.ajax({
      method: "POST",
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      data: JSON.stringify({breed_id: sample.breed, name: formData[0].name}),
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
console.log("run events")
  $("#button").on("click", function(evt){
    //console.log("clicked button")
    evt.preventDefault();
    var formData = $("form").serializeArray();
    console.log(formData)
    Puppyshelter.addPuppy(formData)});

  $('body').on("click", "a", function(evt){
    console.log("clicked adopt")
    evt.preventDefault();
    console.log($(this))
    var puppy_id = $(this).attr("id")
    //$($(this)[0].parentElement).attr("id")
    Puppyshelter.removePuppy(puppy_id);

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