import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getGroupsApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.groups);
    const query_ = query(ref, orderBy("hour"));
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

export { getGroupsApi };
