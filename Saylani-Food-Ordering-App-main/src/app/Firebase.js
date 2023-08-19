import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCOwynj0y1FaiN3Y4WeKBWlGSN14nFruB4",
    authDomain: "saylani-store-6dceb.firebaseapp.com",
    databaseURL: "https://saylani-store-6dceb-default-rtdb.firebaseio.com",
    projectId: "saylani-store-6dceb",
    storageBucket: "saylani-store-6dceb.appspot.com",
    messagingSenderId: "635480836793",
    appId: "1:635480836793:web:cf73a988cf8b5004132968",
    measurementId: "G-CF505ZL7RE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export {auth,database};


