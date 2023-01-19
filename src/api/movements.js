import {
  doc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../firebase/index";
import { info } from "../utils/info";

const getMovementsApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.movements);
    const query_ = query(ref, where("active", "==", true));
    const snapshot = await getDocs(query_);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (callback) callback(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getMovementByIdApi = async (idMovement, callback) => {
  try {
    const ref = doc(
      db,
      `/${info.firebase.collections.movements}/${idMovement}`
    );
    const snapshot = await getDoc(ref);
    if (callback) callback(snapshot.data());
    if (snapshot.data() == undefined) return -1;
    return snapshot.data();
  } catch (err) {
    throw err;
  }
};

const getMovementCategoriesApi = async (callback) => {
  try {
    const ref = collection(db, info.firebase.collections.movementCategories);
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

const addMovementApi = async (movement, callback) => {
  try {
    const ref = collection(db, info.firebase.collections.movements);
    const docRef = await addDoc(ref, {
      [info.firebase.docKeys.movements.active]: true, // ACTIVE
      [info.firebase.docKeys.movements.name]:
        movement[info.firebase.docKeys.movements.name], // NAME
      [info.firebase.docKeys.movements.description]:
        movement[info.firebase.docKeys.movements.description], // DESCRIPTION
      [info.firebase.docKeys.movements.scoreType]:
        movement[info.firebase.docKeys.movements.scoreType], // SCORE TYPE
      [info.firebase.docKeys.movements.isSkill]:
        movement[info.firebase.docKeys.movements.isSkill], // IS SKILL
      [info.firebase.docKeys.movements.movementCategory]:
        movement[info.firebase.docKeys.movements.movementCategory], // MOV CATEGORY
      timestamps: {
        // TIMESTAMPS
        [info.firebase.docKeys.movements.timestamps.createdAt]:
          Timestamp.fromDate(new Date()),
        [info.firebase.docKeys.movements.timestamps.updatedAt]:
          Timestamp.fromDate(new Date()),
      },
    });
    if (callback) callback();
    return docRef.id;
  } catch (err) {
    console.log(err);
    if (callback) callback(err);
    throw err;
  }
};

export {
  getMovementsApi,
  getMovementByIdApi,
  getMovementCategoriesApi,
  addMovementApi,
};
