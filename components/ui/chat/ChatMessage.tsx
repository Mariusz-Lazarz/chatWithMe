import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChatMessage as ChatMessageType,
  ChatParticipant,
} from "@/lib/definitions";

export default function ChatMessage({
  chatMess,
  user,
}: {
  chatMess: ChatMessageType;
  user: ChatParticipant | undefined;
}) {
  return (
    <div className={`flex flex-row items-center gap-2 justify-end`}>
      <span className="chatText bg-purple-500 p-2 rounded-md text-white break-words">
        {chatMess.message}
      </span>
      <Avatar>
        <AvatarImage src={chatMess.userId === user?.id ? user.image : ""} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
