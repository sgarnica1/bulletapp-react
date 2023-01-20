import {
  collection,
  getDocs,
  query,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getLocationsApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.locations);
    const query_ = query(ref);
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);

    return data;
  } catch (err) {
    throw err;
  }
};

export { getLocationsApi };
