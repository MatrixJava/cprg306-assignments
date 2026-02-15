import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../_utils/firebase";
import { ShoppingItem } from "../shopping-list/types";

export async function getItems(userId: string): Promise<ShoppingItem[]> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const itemsCollection = collection(db, "users", userId, "items");
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ShoppingItem, "id">),
  }));
}

export async function addItem(
  userId: string,
  item: Omit<ShoppingItem, "id">
): Promise<string> {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
}
