"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ShareLinkButton } from "@/components/ui/chat/ShareLinkButton";
import { DeleteButton } from "@/components/ui/chat/DeleteButton";
import { AddUsers } from "@/components/ui/chat/AddUsers";
import ChatUser from "@/components/ui/chat/ChatUser";
import SendMessage from "@/components/ui/chat/SendMessage";
import ChatMessage from "@/components/ui/chat/ChatMessage";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  getDoc,
  doc,
  query,
  collection,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ChatSkeleton from "@/components/ui/chat/ChatSkeleton";
import { getChatParticipants, getChatMessages } from "@/lib/firebaseFunctions";
import {
  ChatMessage as ChatMessageType,
  ChatParticipant,
} from "@/lib/definitions";
export default function ChatWithId() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [chatParticipants, setChatParticipants] = useState<ChatParticipant[]>(
    []
  );
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [adminId, setAdminId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const checkChatExists = async () => {
      setIsLoading(true);
      try {
        if (!chatId) return;
        const chatDocRef = doc(db, "chats", chatId);
        const docSnap = await getDoc(chatDocRef);
        if (docSnap.exists()) {
          setAdminId(docSnap.data().adminId);
          setCurrentChatId(chatId);

          try {
            const [participants, messages] = await Promise.all([
              getChatParticipants(chatId),
              getChatMessages(chatId),
            ]);

            setChatParticipants(participants);
            setChatMessages(messages);
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

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ChatMessageType)
      );
      setChatMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
    <div className="chat flex flex-col ">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          <AddUsers chatId={chatId} />
          <ShareLinkButton />
          <DeleteButton currentChatId={currentChatId} />
        </div>
      </div>
      <div className="flex gap-4 border-2 rounded-full p-2 mb-2">
        {chatParticipants.map((user, i) => (
          <ChatUser key={i} user={user} adminId={adminId} />
        ))}
      </div>
      <>
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto p-4">
          {chatMessages.map((mess, index) => (
            <ChatMessage
              key={mess.id}
              chatMess={mess}
              user={chatParticipants.find(
                (participant) => participant.id === mess.userId
              )}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <SendMessage chatId={chatId} />
      </>
    </div>
  );
}
