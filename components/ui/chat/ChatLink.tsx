import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatPreview } from "@/lib/definitions";
import Link from "next/link";

export default function ChatLink({
  chatPreview,
}: {
  chatPreview: ChatPreview;
}) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) {
      return "No messages yet";
    }

    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  console.log(chatPreview.createdAt);

  return (
    <Link href={`/chat/${chatPreview.chatId}`}>
      <div className="hover:bg-gray-700 p-4 cursor-pointer">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Avatar className="cursor-pointer">
              <AvatarImage src={chatPreview.adminImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>{chatPreview.adminName.split(" ")[0]}</p>
              <span className="opacity-50">
                {chatPreview.lastMessage === ""
                  ? "No messages yet"
                  : chatPreview.lastMessage}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="opacity-50">
              {formatDate(chatPreview.createdAt)}
            </span>
            <span className="opacity-50">
              chat #{chatPreview.chatId.slice(-4)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
