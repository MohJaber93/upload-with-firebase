import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCkFzsKwFScuwLCuLMsgOoNf1hZq8APCHA",
  authDomain: "chatingapp-d7d89.firebaseapp.com",
  databaseURL: "https://chatingapp-d7d89.firebaseio.com",
  projectId: "chatingapp-d7d89",
  storageBucket: "chatingapp-d7d89.appspot.com",
  messagingSenderId: "750957257336",
  appId: "1:750957257336:web:2e152eb6c9af85b918038d",
  measurementId: "G-P0RDQCFF5M",
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
