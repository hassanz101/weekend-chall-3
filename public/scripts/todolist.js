console.log('js');

$(document).ready(onReady);
// addList();
getList();
function onReady(){
  console.log('jQ sourced');

  //click listeners
//create a complete and delete button and functions with ajax calls
$(".addbutton").on('click', getList);

}
//add items to do list
function getList(){
  $.ajax({
    url:'/getList',
    type:'GET',
    success: function(response){
      console.log(response);
      $('#task_list').empty();
         for (var i = 0; i < response.length; i++) {
       $('#task_list').append('<li>' + response[i].task + " " + response[i].status + '</li>');

    }//end for
    } // end success
  }); // end ajax GET
} // end getList


// //add list from db ajax POST
function addList(){

  var listToSend = {
    task: $("#task_list").val(),
    status: ''
  };

$.ajax ({
  url: "/addList",
  type: "POST",
  data: listToSend,
  success: function(response){
    console.log('in addList route', response);
    console.log(response);

 }

  });
}
