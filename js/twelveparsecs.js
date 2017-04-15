//js file for star wars api hw

$(document).ready(function() {


$('.display').click(function(event) {
    event.preventDefault();
    //get category from h4's parent div
    $parent = $('h4').parent();
    var $cat = $parent.attr('class');
    let cat = String($cat);
    //get id to search for...currently only returning id_1, not unique id
    var $id = $("h4").attr('id');
    console.log($id);
    //slice off num to use in ajax url req
    if($id.length == 4) {
        id_num = $id.slice(-1) + '/';
    } else if ($id.length == 5) {
        id_num = $id.slice(-2) + '/';
    } else {
        id_num = $id.slice(-3) + '/';
    }
    console.log(id_num);

    $.ajax({
        type: 'GET',
        url: 'https://swapi.co/api/' + $cat + id_num,
        success: function(result) {
            console.log(result);
        }
    })
    $id.empty();

});


//good progress.. now make detais appear when click on the name h3

//click button to search
$('#getInfo').click(function(event) {
    event.preventDefault();
    //get category
    let $val = $('#searchParams :input');
    $val = $val.serialize();
    let $choice = $val.slice(5) + '/';

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
                    $cat.append("Episode " + $result.results[i].episode_id + ':\t' + $result.results[i].title);
                    $cat.attr("id", "id_" + (i+1));
                    $cat.attr("class", $choice)
                    $bigbox.append($cat);
                } else {
                    $cat.append($result.results[i].name);
                    $cat.attr("id", "id_" + (i+1));
                    $bigbox.attr("class", $choice)
                    $bigbox.append($cat);
                }
            }
            $('.display').empty();
            $('.display').append($bigbox);
            }
})


});

});
