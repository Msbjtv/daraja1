import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMY--LlOVP5hi6p1C78Eioq93Q9N2XdEs",
  authDomain: "survey2-3d551.firebaseapp.com",
  projectId: "survey2-3d551",
  storageBucket: "survey2-3d551.appspot.com",
  messagingSenderId: "55058381103",
  appId: "1:55058381103:web:827b25cdf1671eaa2f09da",
  measurementId: "G-HZGWZ2BRVV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)