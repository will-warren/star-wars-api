//js file for star wars api hw

$(document).ready(function() {


$('.display').click(function(event) {
    event.preventDefault();
    //get category from li's parent div
    let $parent = $('li').parent();
    let $cat = $parent.attr('class');
    let cat = String($cat);
    //get id to search for
    var $id = $('li.active').attr('id');
    //slice off num to use in ajax url req
    if($id.length == 4) {
        id_num = $id.slice(-1) + '/';
    } else if ($id.length == 5) {
        id_num = $id.slice(-2) + '/';
    } else {
        id_num = $id.slice(-3) + '/';
    }

    $.ajax({         // do I need to create all the jquery objs in ajax or outside?
        type: 'GET',
        url: 'https://swapi.co/api/' + $cat + id_num,
        success: function(result) {
            $info = $('<div>');
            $info.append($('<ul id="details">'))
            $keys = Object.keys(result);
            $values = Object.values(result);
            for(var i = 0; i < $keys.length; i++) {
                $info.append($keys[i] + ": \t" +  $values[i]);
                $info.append($("<br>"))
            }
            console.log($info);
            $('li.active').append($info);
        }
    })

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
            $bigbox.append($('<ul id="cats">'))
            for(var i = 0; i < $result.results.length; i++) {
                $cat = $('<li>');
                if($choice === "films/") {
                    $cat.append("Episode " + $result.results[i].episode_id + ':\t' + $result.results[i].title);
                    $cat.attr("id", "id_" + (i+1));
                    $($cat).on('click',function() {
                      $($cat).removeClass('active');
                      $(this).addClass('active');
                    });
                    $bigbox.attr("class", $choice)
                    $bigbox.append($cat);
                } else {
                    $cat.append($result.results[i].name);
                    $($cat).on('click',function() {
                      $($cat).removeClass('active');
                      $(this).addClass('active');
                    });
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
