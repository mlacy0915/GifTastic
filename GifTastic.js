$(document).ready(function() {

var characters = ['Chucky Finster', 'Hello Kitty', 'Tweety', 'Bart Simpson', 'Stewie Griffin', 'Tommy Pickles', 'SpongeBob', 'Jessica Rabbit', 'Angelica Pickles']
        function renderButtons() {
            $("#buttons-view").empty();
            for (var i = 0; i < movies.length; i++) {
                var a = $("<button>");
            }
        }

function displayInfo() {
    $('characters-view'.empty();
    var characters = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=phHDEoInskvMaQVuGb7XMLce6curKEvv";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {

        if(response.pagination.total_count == 0) {
            alert('Wow this suck! We could not find any Gifs for that character');
            var itemindex = characters.indexof(characters);

            if(itemindex > -1) {
                topics.splice(itemindex, 1);
                renderButtons();
            }
        }
    
    })
    )
}


    $ ("#AddCharacter").onclick("click", function() {
        alert("Character Added!")
    });
    
});
