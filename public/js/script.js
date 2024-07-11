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
            socket.emit("send-location", { latitude, longitude })
        }, (error) => {
            console.log(error);
        }, {
        enableHighAccuracy: true,      
        timeout: 5000,
        maximumAge: 0
    })
}