import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FBASE_API_KEY,
  authDomain: process.env.VUE_APP_FBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FBASE_MESS_SENDER_ID,
  appId: process.env.VUE_APP_FBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { firebaseApp, auth, db };
