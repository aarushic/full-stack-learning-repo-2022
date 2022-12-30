const firebase = require("firebase-admin");
const credentials = require("./cred.json");

// Load Credentials
var { getStorage } = require("firebase-admin/storage");
firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  storageBucket: "gs://week9-4deab.appspot.com",
});

var bucket = getStorage().bucket();

module.exports = {
  firebase,
  bucket
}
//module.exports = firebase;
//module.exports = bucket;






