// Firebase App (the core Firebase SDK) is always required and must be listed first
firebase = require("firebase/app");
require("firebase/auth");

module.exports = function(callback)
{
  // for Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
      apiKey: "AIzaSyCoYWvBpA9Yz00xZ41O0FCNy85uJIyBP0c",
      authDomain: "moments-of-joy.firebaseapp.com",
      databaseURL: "https://moments-of-joy-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "moments-of-joy",
      storageBucket: "moments-of-joy.appspot.com",
      messagingSenderId: "716512417434",
      appId: "1:716512417434:web:b6ecb1269e3c484d9d7123",
      measurementId: "G-K2P28Y3X0H"
    };

  // initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var auth = firebase.auth();
  auth.useEmulator("http://localhost:9099");

  firebase.auth().signInWithEmailAndPassword('tester@moj.com', '123456')
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      console.log('Successfully logged in user: ', user.uid);

      firebase.auth().currentUser.getIdToken()
          .then((idToken) => {
            console.log('Successfully got token of logged in user: ', idToken);

            callback(null, idToken);
          })
          .catch((error) => {
              console.log('failed to get user token: ', error);

              callback(error, null);
          });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log('failed to login user: ', errorMessage);
      
      callback(errorMessage, null);
    });
}
