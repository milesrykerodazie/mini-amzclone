import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDvbMlLcIXjQJ5iNsckIZt2MozC0IlzHlo",
  authDomain: "amzn-clone-446ee.firebaseapp.com",
  projectId: "amzn-clone-446ee",
  storageBucket: "amzn-clone-446ee.appspot.com",
  messagingSenderId: "246069023442",
  appId: "1:246069023442:web:3d8952b042ff7023c4130b",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
