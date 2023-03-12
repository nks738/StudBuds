var config = {
    apiKey: "AIzaSyCrOTu3fKwtrwzNCf0HkRPI3y0hPYcxLhA",
    authDomain: "rosehacks-0000.firebaseapp.com",
    databaseURL: "https://rosehacks-0000.firebaseio.com",
    projectId: "rosehacks-0000",
    storageBucket: "rosehacks-0000.appspot.com",
    messagingSenderId: "874475194277"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
} 

var firestone = firebase.firestore();

const docRef = firestone.collection("Locations").doc("MainLocation");
const outputHeader = document.querySelector("#userprompt");
const inputTextField = document.querySelector("#useraddress");
const inputConfirm = document.querySelector("#userconfirm");
let textToSave;

inputConfirm.addEventListener("click", function(){
    textToSave = inputTextField.value;
    docRef.set({
        Position: textToSave

    });
    window.location.href = "budup.html";
})