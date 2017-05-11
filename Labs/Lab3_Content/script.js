function getData() {
    address = $("#msg").val();
    var address = $("#msg").val();
    $("#msg").val("");
    var myURL = "https://freegeoip.net/json/"
    $.ajax({
        url: myURL + address,
        success: function(data) {
            console.log(data);

            var city = data.city;
            var country = data.country_name;
            var ip = data.ip;
            var latitude = data.latitude;
            var longitude = data.longitude;
            var timezone = data.time_zone;
            var zip = data.zip_code;

            $('#myModal').modal({
                show: 'true'
            });

            $("#myModalLabel").html(address.bold().toUpperCase());
            if(city.length != 0) {
            $("#location").html(("Location: ").bold() + city + ", " + country);
        }
            else {
            $("#location").html(("Location: ").bold() + country);
            }
            $("#zip").html(("Zip Code: ").bold() + zip);
            $("#ip").html(("IP: ").bold() + ip);
            $("#coordinates").html(("Coordinates: ").bold() + latitude + ", " + longitude);
        }
    })
}
