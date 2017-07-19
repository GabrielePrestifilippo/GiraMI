var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttrib
    });

var placemark = L.icon({
    iconUrl: '../external/images/placemark.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});


var placemarkVisited = L.icon({
    iconUrl: '../external/images/placemark_visited.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});


var person = L.icon({
    iconUrl: '../external/images/person.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 0] // point of the icon which will correspond to marker's location
});


var map = L.map('map', {
    zoomControl: false
}).setView([45.4651094,9.1968704], 10);

map.addLayer(osm);

var myMarker = L.marker([0, 0], {icon: person}).addTo(map);

function navigateBack(){
    window.postMessage('{"navigate":true}', '*');
};

document.addEventListener('message', function (e) {
    var message = JSON.parse(e.data);
    if (message.position && message.position.latitude) {
        var currentCoordinates = [message.position.latitude, message.position.longitude];
        map.setView([currentCoordinates[0], currentCoordinates[1]], 16);
        var newLatLng = new L.LatLng(currentCoordinates[0], currentCoordinates[1]);
        myMarker.setLatLng(newLatLng);
    } else if (message.points && message.history) {
        message.points.forEach(function (p) {
            var m;
            if (message.history[p.question]) {
                m=L.marker([p.lat, p.lon], {icon: placemarkVisited}).addTo(map);
            } else {
                m=L.marker([p.lat, p.lon], {icon: placemark}).addTo(map);
            }
            if(p.info && p.thumb){

                var link='<a onclick="navigateBack()" class="linkMap" href="#">'+p.info+'</a>';
                var image = '<img class="thumb" src="' + p.thumb + '"/>';

                m.bindPopup(link+'<br>'+image);
            }
        });
    }
});