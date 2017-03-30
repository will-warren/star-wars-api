//js file for star wars api hw

$(document).ready(function() {


function showDetail(name) {
    $detailDiv = $('<div>')
    
}

//click button to search
$('#getInfo').click(function(event) {
    event.preventDefault();
    //get category
    let $val = $('#searchParams :input');
    $val = $val.serialize();
    let $choice = $val.slice(5) + '/';
    console.log($choice);
    //make ajax request
    $.ajax({
        type: "GET",
        url: 'https://swapi.co/api/' + $choice,
        // data: '{ results : name }',
        success: function(result) {
            let $result = result
            let $bigbox =$('<div>');

            for(var i = 0; i < $result.results.length; i++) {
                $cat = $('<h4>');
                if($choice === "films/") {
                    console.log($result.results[i].title);
                    $cat.append($result.results[i].title);
                    $bigbox.append($cat);
                } else {
                    console.log($result.results[i].name);
                    $cat.append($result.results[i].name);
                    $cat.on('click', showDetail);
                    $bigbox.append($cat);
                }
            }
            $('#display').empty();
            $('#display').append($bigbox);
            }
});
