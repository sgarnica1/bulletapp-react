import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getPlansApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.plans);
    const query_ = query(ref, orderBy("name"));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (callback) callback(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getPlansApi };
