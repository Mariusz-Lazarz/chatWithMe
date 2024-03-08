"use client";
import { useParams } from "next/navigation";
import { ShareLinkButton } from "@/components/ui/chat/ShareLinkButton";
import { DeleteButton } from "@/components/ui/chat/DeleteButton";
import { AddUserButton } from "@/components/ui/chat/AddUserButton";

import ChatUser from "@/components/ui/chat/ChatUser";
import SendMessage from "@/components/ui/chat/SendMessage";
import ChatMessage from "@/components/ui/chat/ChatMessage";

export default function ChatWithId() {
  const { chatId } = useParams<{ chatId: string }>();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          <AddUserButton />
          <ShareLinkButton />
          <DeleteButton />
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-2 rounded-full p-2 my-6">
        <ChatUser />
      </div>
      <div className="flex flex-col gap-4 flex-grow overflow-y-auto p-4">
        <ChatMessage />
      </div>
      <SendMessage />
    </div>
  );
}
