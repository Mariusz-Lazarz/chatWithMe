import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function InviteUsers() {
  return (
    <div className="bg-blue-700 w-full h-60 rounded-lg flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <ChatBubbleIcon className="h-[2rem] w-[2rem]" />
        <h1 className="text-lg">
          Bring a friend along and initiate the conversation in ANY language of
          your choice to begin!
        </h1>
        <p>
          The AI will automatically recognize and translate everything for you.
        </p>
      </div>
    </div>
  );
}
