import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getRolesApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.roles);
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

const getRoleByTypeApi = async (type, callback) => {
  try {
    const ref = collection(db, info.firebase.collections.roles);
    const query_ = query(ref, where("type", "==", type));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);

    return data[0];
  } catch (err) {
    throw err;
  }
};

export { getRolesApi, getRoleByTypeApi };
