var formatcoordinateslat2//add
var formatcoordinateslon2//add
var name
var i = 0
var min
var bud
var locations
var location

function getQuery() {
    firebase.firestore().collection('Locations').get()
        .then(function (querySnapshot) {
            console.log("got snapshot", querySnapshot);
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().Position);
                locations = doc.data().Position
                geocode();

            });
        }
        )
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function geocode() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: locations,
            key: 'AIzaSyDlMKTSb9YdUSGmONBjlgZcTgAn3kDSZ_g'
        }
    })
        .then(function (response) {
            console.log(response);
            formatcoordinateslat2 = response.data.results[0].geometry.location.lat
            formatcoordinateslon2 = response.data.results[0].geometry.location.lng
            geocodee();
        })
        .catch(function (error) {
            console.log(error);
        });
}


function geocodee() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: textToSave,
            key: 'AIzaSyDlMKTSb9YdUSGmONBjlgZcTgAn3kDSZ_g'
        }
    })
        .then(function (response) {
            console.log(response);
            var formatcoordinateslat = response.data.results[0].geometry.location.lat
            var formatcoordinateslon = response.data.results[0].geometry.location.lng
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(formatcoordinateslat2 - formatcoordinateslat);  // deg2rad below
            var dLon = deg2rad(formatcoordinateslon2 - formatcoordinateslon);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +//haversine formula
                Math.cos(deg2rad(formatcoordinateslat)) * Math.cos(deg2rad(formatcoordinateslat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c * .621371; // Distance in miles

            console.log(d)



            
        })

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
}


document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app)
    console.log("RAMBO");
    getQuery();

})

function googleLogin() {
    const reference = firestone.collection("Locations").doc("Name");
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            var stringme = user.displayName;
            var stringme = JSON.stringify(stringme);

            reference.set({
                User: stringme
            })
            windows.location.herf = "budup.html"
        })
} 