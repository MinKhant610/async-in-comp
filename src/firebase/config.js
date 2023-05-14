import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDazibtqFLvPxWosPnxDZfvbecO-tz0c3I",
    authDomain: "vue-blog-9e9cb.firebaseapp.com",
    projectId: "vue-blog-9e9cb",
    storageBucket: "vue-blog-9e9cb.appspot.com",
    messagingSenderId: "710465538952",
    appId: "1:710465538952:web:6b8ec1ba541bf03287883d"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// database setup
let db = firebase.firestore();
let timestamp = firebase.firestore.FieldValue.serverTimestamp
export {db, timestamp};