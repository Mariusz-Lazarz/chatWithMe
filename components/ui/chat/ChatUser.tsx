import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatUser() {
  
  return (
    <div className="w-fit rounded-full p-2 flex items-center gap-2 bg-secondary">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-xs">
        <span className="text-">iluu0456@gmail.com</span>
        <span className="text-blue-500">Admin</span>
      </div>
    </div>
  );
}
