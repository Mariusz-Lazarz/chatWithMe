"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const createChat = async () => {
    if (!session) return;
    try {
      const chatDocRef = await addDoc(collection(db, "chats"), {
        createdAt: new Date(),
        adminId: session.user?.id,
      });

      await setDoc(
        doc(db, `chats/${chatDocRef.id}/participants`, session.user?.id),
        {
          userId: session.user?.id,
        }
      );

      router.push(`/chat/${chatDocRef.id}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return <Button onClick={() => createChat()}>Create chat</Button>;
}
