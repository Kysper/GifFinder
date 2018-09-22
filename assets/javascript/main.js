
$(document).ready(function () {
  buttonArray = ["videogames","games","boardgames","d&d","halo","neverwinter","warcraft","esports","dragonage","unity",];
  createButtons();
  $("#click-add").on('click', function () {
   var inputSearch = $("#button-name-add").val();
   
    buttonArray.push(inputSearch);
    if(inputSearch != ""){
    createButtons();
    }
  });


  function getGifs() {
    $(".gif-display").text("")
    console.log(buttonArray);
    var inputSearch =  $(this).attr("data-name");
    var api_key = "U0b4Ga4ENX4mbzbBx7RbPMlzCCVIjPpr";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inputSearch + "&api_key=" + api_key + "&limit=10&lang=en";
    console.log(inputSearch);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      requests = response.data;
      for (i = 0; i < requests.length; i++) {
        if (requests[i].rating !== "r" && requests[i].rating !== "pg-13") {
          var newDiv = $("<div>");
          var rating = requests[i].rating;

          var paragraph = $("<p>").html("<h2>Rating:<h2> " + rating.toUpperCase());

          image = $("<img>");
          image.attr('src', requests[i].images.fixed_height_still.url);
          image.attr('data-still', requests[i].images.fixed_height_still.url);
          image.addClass('gif');
          image.attr('data-state', 'still');
          image.attr('data-animate', requests[i].images.fixed_height.url);

          console.log(image);

          newDiv.append(paragraph);
          newDiv.append(image);

          $(".gif-display").prepend(newDiv);
        }
      }
    });
  }

  $(document).on('click',".spawned-buttons", getGifs);


  $('body').on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  function createButtons() {
    $("#button-spawner").empty();

    for (var i = 0; i < buttonArray.length; i++) {

      var buttons = $('<button class="spawned-buttons">')
      

     
      buttons.attr('data-name', buttonArray[i]);
      buttons.text(buttonArray[i]);
      $('#button-spawner').append(buttons);
    }
  }
  
   
 


});