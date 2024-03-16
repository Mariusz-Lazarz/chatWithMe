"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ShareLinkButton } from "@/components/ui/chat/ShareLinkButton";
import { DeleteButton } from "@/components/ui/chat/DeleteButton";
import { AddUsers } from "@/components/ui/chat/AddUsers";
import ChatUser from "@/components/ui/chat/ChatUser";
import SendMessage from "@/components/ui/chat/SendMessage";
import ChatMessage from "@/components/ui/chat/ChatMessage";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import ChatSkeleton from "@/components/ui/chat/ChatSkeleton";
export default function ChatWithId() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const checkChatExists = async () => {
      setIsLoading(true);
      try {
        if (!chatId) return;
        const chatDocRef = doc(db, "chats", chatId);
        await getDoc(chatDocRef);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unexpected error");
        }
      }
      setIsLoading(false);
    };

    checkChatExists();
  }, [chatId, router]);

  if (isLoading) {
    return <ChatSkeleton />;
  }
  if (error === "Missing or insufficient permissions.") {
    return <h1>404 - Page Not Found</h1>;
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          <AddUsers />
          <ShareLinkButton />
          <DeleteButton chatId={chatId} />
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-2 rounded-full p-2 my-6">
        <ChatUser />
      </div>
      <>
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto p-4">
          <ChatMessage />
        </div>
        <SendMessage />
      </>
    </div>
  );
}
