import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCYYPvhDAIiKfQaWwSUFu7kIKAxhy7A9Hg",
    authDomain: "codewithchill.firebaseapp.com",
    projectId: "codewithchill",
    storageBucket: "codewithchill.appspot.com",
    messagingSenderId: "164188301714",
    appId: "1:164188301714:web:d752465d6811ad6c21794b"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// database setup
let db = firebase.firestore();
let auth = firebase.auth();
let timestamp = firebase.firestore.FieldValue.serverTimestamp
export {db, timestamp, auth};