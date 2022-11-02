import { db } from "utils/firebase"
import { collection, query, where, getDocs } from "firebase/firestore/lite";

export async function getDuties() {
  const dutiesRef = collection(db, "duties");
  const q = query(dutiesRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
}
