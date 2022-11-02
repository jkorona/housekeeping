import { db } from "utils/firebase"
import { collection, query, where, getDocs } from "firebase/firestore/lite";

export async function getDutiesForDay(dayNo) {
  const agendaRef = collection(db, "agenda");
  const q = query(agendaRef, where("dayNo", "==", 1));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
}

export function getDutiesForPerson(person) {
  // todo
}
