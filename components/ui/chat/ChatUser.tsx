import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatParticipant } from "@/lib/definitions";

export default function ChatUser({
  user,
  adminId,
}: {
  user: ChatParticipant;
  adminId: string;
}) {
  return (
    <div className="w-fit rounded-full px-4 py-2 flex items-center gap-2 bg-secondary">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-xs">
        <span className="text-">{user.name.split(" ")[0]}</span>
        <span className="text-blue-500">
          {adminId === user.id ? "Admin" : ""}
        </span>
      </div>
    </div>
  );
}
