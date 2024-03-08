"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const createChat = async () => {
    if (!session) return;
    try {
      const docRef = await addDoc(
        collection(db, `/chat`, session.user?.id, "/chats"),
        {
          messages: "Test chat",
        }
      );
      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={() => createChat()}>Create chat</Button>;
}
