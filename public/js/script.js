const socket = io();

// CHECK IF THE BROWSER SUPPORT THE GEOLOCATION
// SET OPTIONS FOR HIGH ACCURACY, A 5 SECOND TIMEOUT, AND NO CACHING
// USE WATCHPOSITION TO TRACK THE USER LOCATION CONTINUOUSLY
// EMIT THE LATITUDE AND LONGINTUDE VIA A SOCKET WITH SEND-LOCATION. lOG ANY ERROR TO THE CONSOLE
// INITIALIZE THE MAP TO THE CENTER AT COORDINATE (0,0) WITH A ZOOM LEVEL OF 15 USING LEAFLET.
// ADD OpenStreetMap TILES TO THE MAP.
// CREATE AN EMPTY OBJECT MARKERS.
// WHEN RECIEVING LOCATION DATA VIA THE SOCKET, EXTRACT_ID.....



if (navigator.geolocation) {
    // console.log("yes");
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude)
            console.log(longitude)
            socket.emit("send-location", { latitude, longitude })
        }, (error) => {
            console.log(error);
        }, {
        enableHighAccuracy: true,      
        timeout: 5000,
        maximumAge: 0
    })
}

const map = L.map("map").setView([0,0], 16);

// zoom level z, longitude x and latitude y
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution : "OpenStreetMap"
}).addTo(map)

const markers = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude])
    if(markers[id]){
        markers[id].setLatLang([latitude, longitude])               // setLatituteLongitude
    }else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
})


socket.on("user-disconnect", (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})