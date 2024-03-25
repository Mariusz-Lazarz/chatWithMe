import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { ChatParticipant, ChatMessage } from "./definitions";

async function getChatParticipantsIds(chatId: string) {
  const participantsCollectionRef = collection(
    db,
    "chats",
    chatId,
    "participants"
  );
  const participantsSnap = await getDocs(participantsCollectionRef);
  if (participantsSnap.empty) {
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
    return null;
  }
}

export const getChatParticipants = async (
  chatId: string
): Promise<ChatParticipant[]> => {
  try {
    const participantIds = await getChatParticipantsIds(chatId);
    const usersPromises = participantIds.map(getUserData);
    const users = await Promise.all(usersPromises);
    return users.filter((user): user is ChatParticipant => user !== null);
  } catch (error) {
    throw error;
  }
};

export const sendChatMessage = async (
  chatId: string,
  message: string,
  userId: string
) => {
  try {
    if (!userId) return;
    const messagesRef = collection(db, `chats/${chatId}/messages`);

    const newMessageRef = await addDoc(messagesRef, {
      message: message,
      userId: userId,
      createdAt: new Date(),
    });
  } catch (error) {
    throw new Error("Nie udało się wysłać wiadomości: " + error);
  }
};

export const getChatMessages = async (
  chatId: string
): Promise<ChatMessage[]> => {
  const chatRef = collection(db, "chats", chatId, "messages");
  const chatSnap = await getDocs(chatRef);
  if (chatSnap.empty) {
    return [];
  }

  const messagesWithId = chatSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as ChatMessage),
  }));

  const sortedMessages = messagesWithId.sort((a, b) => {
    const timeA =
      (a.createdAt.seconds as number) * 1000 +
      (a.createdAt.nanoseconds as number) / 1000000;
    const timeB =
      (b.createdAt.seconds as number) * 1000 +
      (b.createdAt.nanoseconds as number) / 1000000;

    return timeA - timeB;
  });

  return sortedMessages;
};
