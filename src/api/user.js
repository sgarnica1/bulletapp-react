import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

// Firebase keys
const firtsNameKey = info.firebase.docKeys.users.firstName;
const lastNameKey = info.firebase.docKeys.users.lastName;
const emailKey = info.firebase.docKeys.users.email;
const planKey = info.firebase.docKeys.users.plan;
const groupKey = info.firebase.docKeys.users.group;
const birthDayKey = info.firebase.docKeys.users.birthDay;
const birthMonthKey = info.firebase.docKeys.users.birthMonth;
const activeKey = info.firebase.docKeys.users.active;
const locationKey = info.firebase.docKeys.users.location;
const roleKey = info.firebase.docKeys.users.role;
const createdAtKey = info.firebase.docKeys.users.timestamps.createdAt;
const updatedAtKey = info.firebase.docKeys.users.timestamps.updatedAt;

const getUsersApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.users);
    const query_ = query(ref, where("role", "==", "athlete"));
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
    if (!user.data) user.data = snapshot.data();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postUserApi = async (uid, user, callback) => {
  try {
    const res = await setDoc(doc(db, "users", uid), {
      [firtsNameKey]: user[firtsNameKey],
      [lastNameKey]: user[lastNameKey],
      [emailKey]: user[emailKey],
      [planKey]: user[planKey],
      [groupKey]: user[groupKey],
      [roleKey]: info.firebase.values.roles.athlete,
      [birthDayKey]: parseInt(user[birthDayKey]),
      [birthMonthKey]: parseInt(user[birthMonthKey]),
      [locationKey]: info.data.locations.juriquilla,
      [activeKey]: false,
      [createdAtKey]: Timestamp.fromDate(new Date()),
      [updatedAtKey]: Timestamp.fromDate(new Date()),
    });

    if (callback) callback();
    return res;
  } catch (err) {
    if (callback) callback(err);
    console.log(err);
    throw err;
  }
};

const activateUserApi = async (uid, callback) => {
  try {
    const ref = doc(db, `/${info.firebase.collections.users}/${uid}`);
    const res = await updateDoc(ref, {
      [activeKey]: true,
      [updatedAtKey]: Timestamp.fromDate(new Date()),
    });
    if (callback) callback(res);
    return res;
  } catch (err) {
    throw err;
  }
};

const deactivateUserApi = async (uid, callback) => {
  try {
    const ref = doc(db, `/${info.firebase.collections.users}/${uid}`);
    const res = await updateDoc(ref, {
      [activeKey]: false,
      timestamps: {
        [updatedAtKey]: Timestamp.fromDate(new Date()),
      },
    });
    if (callback) callback(res);
    return res;
  } catch (err) {
    throw err;
  }
};

export {
  getUsersApi,
  getUserByIdApi,
  getUserInfoApi,
  postUserApi,
  activateUserApi,
  deactivateUserApi,
};
