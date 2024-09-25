import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import { getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4CKEzWHP_Kb1sFEwj4hMzdy-Xp1I8g7Q",
  authDomain: "streamingtec-2437d.firebaseapp.com",
  projectId: "streamingtec-2437d",
  storageBucket: "streamingtec-2437d.appspot.com",
  messagingSenderId: "14460784158",
  appId: "1:14460784158:web:c2236834282d414e3c680f"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

export { db, storage };
export default appFirebase;