// Create our map, giving it the streetmap and earthquakes layers to display on load
myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5
  });
  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var quakeCoord = [];
var quakeDepth = [];
var quakeMag = [];
var quakePlace = [];
var quakeTime = [];

d3.json(url, function(data) {
    
    for (var i = 0; i < data.features.length; i++) {
        quakeCoord.push([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]])
        var lng = data.features[i].geometry.coordinates[0];
        var lat = data.features[i].geometry.coordinates[1];
        var latlng = L.latLng(lat, lng);
        var color = "";
        if ( data.features[i].geometry.coordinates[2] > 90) {
            color = "#CE2029";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
            color = "#E9967A";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
            color = "#FF8C00";
        }
        else if (data.features[i].geometry.coordinates[2] > 30) {
            color = "#FFB200";
        }
        else if (data.features[i].geometry.coordinates[2] > 10) {
            color = "#CAE00D";
        }
        else {
            color = "#D0FF14";
        }
        L.circle(latlng, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: data.features[i].properties.mag * 25000
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>" + Date(data.features[i].properties.time) + "</h3>").addTo(myMap);
        quakeDepth.push(data.features[i].geometry.coordinates[2])
    }
})