$(document).ready(function() {
    
    var topics = ['Chucky Finster', 'Hello Kitty', 'Tweety', 'Bart Simpson', 'Stewie Griffin', 'Tommy Pickles', 'SpongeBob', 'Jessica Rabbit', 'Angelica Pickles'];

    function displayInfo(){
      $('#character-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=phHDEoInskvMaQVuGb7XMLce6curKEvv&limit=10';

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {

        if (response.pagination.total_count == 0) {
          alert('Sorry, there are no Gifs for this topic');
          var itemindex = topics.indexOf(topic);
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }

        var results = response.data;
        for (var j = 0; j < results.length; j++){

          var newTopicDiv = $("<div class='character-name'>");
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');

          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif');

          newTopicDiv.append(pRating);
          newTopicDiv.append(pTitle);
          newTopicDiv.append(gif);
  
          $('#character-view').prepend(newTopicDiv);
        } 
      });
    };
    
    function renderButtons() {

      $('.buttons-view').empty();
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    function removeButton(){
      $("#character-view").empty();
      var topic = $(this).attr('data-name');
      var itemindex = topics.indexOf(topic);
      if (itemindex > -1) {
        topics.splice(itemindex, 1);
        renderButtons();
      }
    }

    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    $("#add-character").on("click", function(event) {
      event.preventDefault();

      var character = $("#character-input").val().trim();
   
      if (topics.toString().toLowerCase().indexOf(character.toLowerCase()) != -1) {
        alert("Topic already exists");
      }
      else {
        topics.push(character);
        renderButtons();
      }
    });

    $(document).on("click", ".topic", displayInfo);
    $(document).on("click", ".animate-gif", playGif);
    $(document).on("dblclick", ".topic", removeButton);

    renderButtons();
});

