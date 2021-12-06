import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0h1U9kTvffoqEbsijK-0uGzZ9NGB4R2U",
  authDomain: "swe-boggle-project-3402c.firebaseapp.com",
  projectId: "swe-boggle-project-3402c",
  storageBucket: "swe-boggle-project-3402c.appspot.com",
  messagingSenderId: "148768266996",
  appId: "1:148768266996:web:4a0a708f2bc6e4e9f5dca1",
  measurementId: "G-PT1K75XE4E"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(); // firebase authentication
export const firestore = firebase.firestore(); // firestore db
export default firebase;