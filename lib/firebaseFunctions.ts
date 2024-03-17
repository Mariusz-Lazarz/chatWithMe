import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

async function getChatParticipantsIds(chatId: string) {
  const participantsCollectionRef = collection(
    db,
    "chats",
    chatId,
    "participants"
  );
  const participantsSnap = await getDocs(participantsCollectionRef);
  if (participantsSnap.empty) {
    console.log("No participants found!");
    return [];
  }
  return participantsSnap.docs.map((doc) => doc.id);
}

async function getUserData(userId: string) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else {
    console.log(`User not found: ${userId}`);
    return null;
  }
}

export const getChatParticipants = async (chatId: string) => {
  try {
    const participantIds = await getChatParticipantsIds(chatId);
    const usersPromises = participantIds.map(getUserData);
    const users = await Promise.all(usersPromises);
    return users.filter((user) => user !== null);
  } catch (error) {
    throw error;
  }
};
