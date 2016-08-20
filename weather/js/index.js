$(function() {

  navigator.geolocation.getCurrentPosition(sucCoo, errCo , { enableHighAccuracy: true ,timeout : 5000});

  function sucCoo(position) {
    var urlAPI = "https://api.wunderground.com/api/d3aea801236f5512/geolookup/conditions/lang:BR/q/";
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    urlAPI += lat + "," + lon + ".json";
    $.ajax({
      url: urlAPI,
      dataType: "jsonp",
      success: function(parsed_json) {
        var location = parsed_json['current_observation']['display_location']['full'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        var temp_c = parsed_json['current_observation']['temp_c'];
        var desc = parsed_json['current_observation']['icon'];
        var icon = parsed_json['current_observation']['icon_url'];
        var icon_img = new Image();
        icon_img.src = icon;
        $('#display #location').html(location);
        $('#display #temperature').html(temp_c);
        $('#display #degree').html(' &#8451');

        $('#display #icon').append(icon_img);
        // porting..
        $('.c-degree').on('click', setC);
        $('.f-degree').on('click', setF);

        function setF() {
          $('#display #temperature').html(temp_f);
          $('#display #degree').html(' &#8457');
        }

        function setC() {
          $('#display #temperature').html(temp_c);
          $('#display #degree').html(' &#8451');
        }

      }
    });

  }

  function errCo(err) {
    console.log(err.message);
  }

});