//js file for star wars api hw

$(document).ready(function() {

$('#title').click(function(event) {
    console.log(event + "Clicked");
    $.ajax({
        type: "GET",
        url: 'https://swapi.co/api/',

        success: function(result) {
            $result = result;
            $bigbox =$('<div>');

            for(var i = 0; i < 5; i++) {
                $cat = $('<h4>');
                console.log(result);
                $cat.append($result);
                $bigbox.append($cat);
            }
            $('#display').append($bigbox);


        }


    })
    console.log("hey");
});

});
