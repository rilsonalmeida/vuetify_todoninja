import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDwEG2SWcA9t28INuG0vSUnGsw11WOmldU",
    authDomain: "todoninja-e2175.firebaseapp.com",
    databaseURL: "https://todoninja-e2175.firebaseio.com",
    projectId: "todoninja-e2175",
    storageBucket: "todoninja-e2175.appspot.com",
    messagingSenderId: "576070685477",
    appId: "1:576070685477:web:f0fc34f47d852f889d80cc",
    measurementId: "G-YR1NVQGNEK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true});

  export default db;