import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getUsersApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.users);
    const query_ = query(ref, orderBy("lastname"));
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

const getUserByIdApi = async (id, callback) => {
  try {
    const ref = doc(db, info.firebase.collections.users, id);
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    return snapshot.data();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserInfoApi = async (user, id) => {
  try {
    const ref = doc(db, info.firebase.collections.users, id);
    const snapshot = await getDoc(ref);
    const roleData = await getUserRoleApi(snapshot.data().id_role);
    if (!user.data) {
      user.data = snapshot.data();
      user.data.role = roleData;
    }
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserRoleApi = async (idRole) => {
  try {
    const ref = doc(db, info.firebase.collections.roles, idRole);
    const snapshot = await getDoc(ref);
    return snapshot.data().type;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getUsersApi, getUserByIdApi, getUserInfoApi, getUserRoleApi };
