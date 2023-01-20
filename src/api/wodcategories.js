import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getWodCategoriesApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.wodCategories);
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export { getWodCategoriesApi };
