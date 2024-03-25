"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatMessage as ChatMessageType,
  ChatParticipant,
} from "@/lib/definitions";
import { useSession } from "next-auth/react";

export default function ChatMessage({
  chatMess,
  user,
}: {
  chatMess: ChatMessageType;
  user: ChatParticipant | undefined;
}) {
  const { data: session } = useSession();
  return (
    <div
      className={`flex flex-row items-center gap-2 ${
        chatMess.userId === session?.user.id ? "justify-end" : "justify-start"
      }`}
    >
      <span
        className={`chatText text-xs md:text-lg  p-2 rounded-md text-white break-words ${
          chatMess.userId === session?.user.id ? "bg-purple-500" : "bg-sky-600"
        }`}
      >
        {chatMess.message}
      </span>
      <Avatar>
        <AvatarImage src={chatMess.userId === user?.id ? user.image : ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
