import firebase from "firebase/app";

const FirebaseConfig = {
  apiKey: "AIzaSyAQREc01rt3nbGfoMb_Ccp_y_bfMsQZWys",
  authDomain: "eenthpatthar.firebaseapp.com",
  projectId: "eenthpatthar",
  storageBucket: "eenthpatthar.appspot.com",
  messagingSenderId: "775117692982",
  appId: "1:775117692982:web:87998cfeecb78554e7b897",
  measurementId: "G-9WQJDQHP04",
};

let instance;

const getFirebaseInstance = () => {
  if (instance) {
    return instance;
  } else {
    instance = firebase.initializeApp(FirebaseConfig);
    return instance;
  }
};

export default getFirebaseInstance;
