import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCj4c6WFgIpBjME3hxyqsv6ftHZVfJ4iNQ",
    authDomain: "whatsapp-clone-2968b.firebaseapp.com",
    projectId: "whatsapp-clone-2968b",
    storageBucket: "whatsapp-clone-2968b.appspot.com",
    messagingSenderId: "1043740230876",
    appId: "1:1043740230876:web:c8b0988d917ea8700b6019",
    measurementId: "G-QSZ9Y8PE6S"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;