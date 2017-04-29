//js file. makes ajax calls to SWAPI (http://swapi.co).
//1. first call to list view, lists out sub categories
//2. second call to detail view, shows details for subcat
//3. third call to detail view of those details which are objects
// (arrays in this case) to show a few more details.

$(document).ready(function() {
//need to add active class on click but take off previous active classes

//only one item in the sub category at a time.
$('.display').click(function(event) {
    $src = $(event.target);
    if ($('li').is('.active')) {
        $('.active').each(function(event) {
          $('.active').empty();
          $(this).removeClass('active');
          $(this).append($(this).attr('name'));
        });
        $src.addClass('active');
    }
});

//second api detail view call
$('.display').click(function(event) {
// get top level details
    let $url = $('li.active').attr('id')
    //add s for https
    $url = $url.slice(0,4) + 's' + $url.slice(4)
    console.log($url)
    let $info = ($('<ul id="details">'))
    let $list = $("<ul>");
    var $keys;
    var $values;

    $.ajax({
        type: 'GET',
        url: $url,
        success: function(result) {
            $keys = Object.keys(result);
            $values = Object.values(result);
          //print names for each url link
        for(var i = 0; i < $values.length; i++) {
          if(typeof $values[i] == "object") {
            for( var j = 0; j < $values[i].length; j++) {
                //add s for https
                $.ajax({
                    type: "GET",
                    url: $values[i][j].slice(0,4) + 's' + $values[i][j].slice(4),
                    success: function(result) {
                        if(!result.name) {
                            $info.append($('<li> Episode ' + result.episode_id + " " + result.title + '</li>'));
                        } else {
                            $info.append($('<li/>' + String(result.name) +'</li>'));
                    }
                }
            })
          }
        } else {
            if($keys[i] === 'homeworld') {
                $home = "";
                $.ajax({
                    type: 'GET',
                    url: $values[i],
                    success: function(result) {
                        home = result.name;
                        console.log(result.name);
                        $info.append("<li>homeworld: "  +  home + '</li>');
                    }
                })
            } else if ($keys[i] === 'url') {
                $info.append("<li><a href=\'" + $values[i] + '\'>' + $keys[i] +"</a>");
            } else {
                $info.append("<li>" + $keys[i] + ":   " +  $values[i] + '</li>');
        }
      }
      }
  }})
    $('li.active').empty();
    $('li.active').append($info);
});

//first api list view call. adds category number to url based on form input.
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
                //if films then add title and ep num, if not add item name
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
