//js file for star wars api hw

$(document).ready(function() {
//need to add active class on click but take off previous active classes

$('.display').click(function(event) {
    $src = $(event.target);
    console.log($src);
    if ($('li').is('.active')) {
        $('.active').each(function(event) {
          $('.active').empty();
          $(this).removeClass('active');
          $(this).append($(this).attr('name'));
        });
        $src.addClass('active');
    }
});

$('.display').click(function(event) {
    // get url from id...still having trouble clearing and picking new url each time
    let $url = $('li.active').attr('id')
    let $info = ($('<ul id="details">'))
    let $list = $("<ul>");
    var $keys;
    var $values;

    var $innerKeys;
    var $innerValues;

    $.ajax({
        type: 'GET',
        url: $url,
        success: function(result) {
            $keys = Object.keys(result);
            $values = Object.values(result);
    //print names for each url link
    for(var i = 0; i < $values.length; i++) {
        if(typeof $values[i] == "object") {
            console.log($keys[i]);
            console.log($values[i])
            .
            // for( var j = 0; j < $values[i].length; j++) {
            //     $list.append($('<li><a href=\'' + $values[i][j] +
            //     '/>' + ))
            // }

        } else {
            console.log('else');
            $info.append("<li>" + $keys[i] + ":   " +  $values[i] + '</li>');
      }
      }
      }
    })
    $('li.active').empty();
    $('li.active').append($info);
});

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
        success: function(result) {
            let $result = result
            let $bigbox =$('<div>');
            $bigbox.append($('<ul id="cats">'))
            for(var i = 0; i < $result.results.length; i++) {
                $cat = $('<li>');
                if($choice === "films/") {
                    $cat.append("Episode " + $result.results[i].episode_id + ':\t' + $result.results[i].title);
                    $cat.attr("id", "id_" + $result.results[i].url);
                    $($cat).on('click', function() {
                      $($cat).removeClass('active');
                      $(this).addClass('active');
                    });
                    $bigbox.attr("class", $choice)
                    $bigbox.append($cat);
                } else {
                    $cat.append($result.results[i].name);
                    $cat.attr('name', $result.results[i].name);
                    $cat.attr("id", $result.results[i].url);
                    $($cat).on('click', function() {
                      $($cat).removeClass('active');
                      $(this).addClass('active');
                    });
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
