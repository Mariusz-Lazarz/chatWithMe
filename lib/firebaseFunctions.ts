import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getChatParticipants = async (chatId: string) => {
  try {
    const participantsCollectionRef = collection(
      db,
      "chats",
      chatId,
      "participants"
    );

    const querySnapshot = await getDocs(participantsCollectionRef);

    if (querySnapshot.empty) {
      console.log("No participants found!");
    } else {
      querySnapshot.forEach((doc) => {
        console.log("Participant ID:", doc.id, "Data:", doc.data());
      });
    }
  } catch (error) {
    console.error("Error fetching participants:", error);
  }
};
