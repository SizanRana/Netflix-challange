import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNiGksVRjOIJsWZHIreQwmmaGc_24sdO4",
  authDomain: "netflix-clone-ef43f.firebaseapp.com",
  projectId: "netflix-clone-ef43f",
  storageBucket: "netflix-clone-ef43f.appspot.com",
  messagingSenderId: "317471303313",
  appId: "1:317471303313:web:935684aa5ccfd7e98a8130",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
