"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";
import LoadingSpinner from "../LoadingSpinner";

export default function CreateChatButton() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const createChat = async () => {
    if (!session) return;
    try {
      toast({
        title: "Wait...",
        description: "Your chat is being created...",
      });
      const chatDocRef = await addDoc(collection(db, "chats"), {
        createdAt: serverTimestamp(),
        adminId: session.user?.id,
      });
      await Promise.all([
        setDoc(
          doc(db, `chats/${chatDocRef.id}/participants`, session.user?.id),
          {
            userId: session.user?.id,
          }
        ),
        setDoc(doc(db, `users/${session.user?.id}/chatIds`, chatDocRef.id), {
          chatId: chatDocRef.id,
          joinedAt: serverTimestamp(),
        }),
      ]);
      toast({
        title: "Success",
        description: "Your chat has been created successfully",
        variant: "success",
        duration: 1000,
      });
      setTimeout(() => {
        router.push(`/chat/${chatDocRef.id}`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to create chat. Please try again later!",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return <Button onClick={() => createChat()}>Create chat</Button>;
}
