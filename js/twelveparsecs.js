//js file for star wars api hw

$(document).ready(function() {
$('#title').click(function(event) {
    console.log(event + "Clicked");
    $.ajax({
        type: "GET",
        url: 'https://swapi.co/api/',

        success: function(result) {
            $result = result;
            console.log("Hiii ++ " + $result)
            $bigbox =$('<div>');

            for(var i = 0; i < r; i++) {
                $cat = $('<h4>');
                $name =
                $cat.append($result.planets.serializeArray);
                $bigbox.append($cat);
            }
            $('#display').append($bigbox);


        }


    })
    console.log("hey");
});

});
