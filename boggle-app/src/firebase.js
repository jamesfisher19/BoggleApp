import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwY7AerG8rxQcSdvDPkUNnjBRf7WPta-E",
  authDomain: "bogglesolver-39a9b.firebaseapp.com",
  projectId: "bogglesolver-39a9b",
  storageBucket: "bogglesolver-39a9b.appspot.com",
  messagingSenderId: "300043131515",
  appId: "1:300043131515:web:d98c491c33025408e6a0de",
  measurementId: "G-S0GRRVPJXC"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;