const getDirections = document.getElementById("getDirections");
const source = document.getElementById("source");
const destination = document.getElementById("destination");
const mapEle = document.getElementById("map");
var map,marker;
function load() {
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude,
                    lng = position.coords.longitude,
                    latlng = new google.maps.LatLng(lat, lng),
                    geocoder = new google.maps.Geocoder();
                var storableLocation = {};
                geocoder.geocode({
                    'location': latlng
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results);
                        if (results[0]) {
                            source.value = results[0].formatted_address;
                            map = new google.maps.Map(
                                mapEle, {
                                    zoom: 17,
                                    center: latlng
                                });
                            marker = new google.maps.Marker({
                                position: latlng,
                                map: map
                            })
                        } else {
                            console.log("No reverse geocode results.")
                        }
                    } else {
                        console.log("Geocoder failed: " + status)
                    }
                    console.log(storableLocation)
                });
            },
            function(error){
                mapEle.innerHTML = error.message;
            }
        );
    }
}

getDirections.addEventListener("click", function (event) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(
        mapEle, {
            zoom: 17,
        });
    directionsDisplay.setMap(map);
    const request = {
        origin: source.value,
        destination: destination.value,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
    if (status == 'OK') {
        directionsDisplay.setDirections(result);
    }
    });
});