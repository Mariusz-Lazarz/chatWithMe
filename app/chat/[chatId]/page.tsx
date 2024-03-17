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
import { getChatParticipants, getChatMessages } from "@/lib/firebaseFunctions";
export default function ChatWithId() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  useEffect(() => {
    const checkChatExists = async () => {
      setIsLoading(true);
      try {
        if (!chatId) return;
        setIsLoading(false);
        const chatDocRef = doc(db, "chats", chatId);
        const docSnap = await getDoc(chatDocRef);
        if (docSnap.exists()) {
          setCurrentChatId(chatId);

          try {
            const [participants, messages] = await Promise.all([
              getChatParticipants(chatId),
              getChatMessages(chatId),
            ]);

            console.log(participants, messages);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    };

    checkChatExists();
  }, [chatId, router]);

  if (isLoading) {
    return <ChatSkeleton />;
  }
  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl">Oops!! Something went wrong</h1>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          <AddUsers />
          <ShareLinkButton />
          <DeleteButton currentChatId={currentChatId} />
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-2 rounded-full p-2 my-6">
        <ChatUser />
      </div>
      <>
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto p-4">
          <ChatMessage />
        </div>
        <SendMessage chatId={chatId} />
      </>
    </div>
  );
}
