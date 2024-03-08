import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatMessage() {
  return (
    <div className="flex flex-row items-center gap-2 justify-end">
      <span className="chatText bg-purple-500 p-2 rounded-md text-white break-words">
        Hi what`s upsgagag
      </span>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
