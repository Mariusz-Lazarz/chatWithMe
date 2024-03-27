"use client";
import ChatLink from "@/components/ui/chat/ChatLink";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { ChatPreview } from "@/lib/definitions";
import ChatListSkeleton from "@/components/ui/chat/ChatListSkeleton";

export default function ChatPage() {
  const { data: session } = useSession();
  const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!session) return;

    const fetchChatsAndLastMessages = async () => {
      try {
        const chatsRef = collection(db, `users/${session.user.id}/chatIds`);
        const chatsSnap = await getDocs(chatsRef);
        const chatIds = chatsSnap.docs.map((doc) => doc.data().chatId);

        console.log("Retrieved chat IDs:", chatIds);

        const chatPreviewsPromises = chatIds.map(async (chatId) => {
          const chatDocRef = doc(db, `chats/${chatId}`);
          const chatDocSnap = await getDoc(chatDocRef);

          console.log(
            "Retrieved chat document for chat ID:",
            chatId,
            "Snapshot:",
            chatDocSnap.exists()
          );

          let adminName = "";
          let adminImage = "";

          if (chatDocSnap.exists()) {
            const adminId = chatDocSnap.data().adminId;

            const adminRef = doc(db, `users/${adminId}`);
            const adminSnap = await getDoc(adminRef);
            if (adminSnap.exists()) {
              adminName = adminSnap.data().name;
              adminImage = adminSnap.data().image;
            }
          }

          const messagesRef = collection(db, `chats/${chatId}/messages`);
          const lastMessageQuery = query(
            messagesRef,
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const lastMessageSnap = await getDocs(lastMessageQuery);
          console.log(
            "Retrieved last message snapshot for chat ID:",
            chatId,
            "Snapshot:",
            lastMessageSnap.empty
          );

          let lastMessageData = {
            lastMessage: "",
            createdAt: "",
            userId: "",
          };
          if (!lastMessageSnap.empty) {
            const data = lastMessageSnap.docs[0].data();
            lastMessageData = {
              lastMessage: data.message as string,
              createdAt: data.createdAt.toDate() as string,
              userId: data.userId as string,
            };
          }

          return {
            chatId,
            ...lastMessageData,
            adminName,
            adminImage,
          };
        });

        const resolvedChatPreviews = await Promise.all(chatPreviewsPromises);
        console.log("Resolved chat previews:", resolvedChatPreviews);

        setChatPreviews(resolvedChatPreviews);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatsAndLastMessages();
  }, [session]);

  return (
    <>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <ChatListSkeleton key={index} />
          ))
        : chatPreviews
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((chatPreview) => (
              <ChatLink key={chatPreview.chatId} chatPreview={chatPreview} />
            ))}
    </>
  );
}
