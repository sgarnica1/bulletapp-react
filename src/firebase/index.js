import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const getMovementsApi = async (callback) => {
  try {
    const ref = collection(db, "movements");
    const query_ = query(ref, where("skill", "==", true));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        movement_category: arrayUnion("Skills"),
        // movement_category: arrayRemove("Skills"),
      });
    });
    if (callback) callback(data);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

// getMovementsApi();

export { db, auth };
