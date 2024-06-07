// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADEMzXTDAY3mvgP69c5KFf2-sbhxVC2_8",
  authDomain: "experimentslabs-2ea3f.firebaseapp.com",
  projectId: "experimentslabs-2ea3f",
  storageBucket: "experimentslabs-2ea3f.appspot.com",
  messagingSenderId: "732586093992",
  appId: "1:732586093992:web:04d3c246ef31741036419d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth