import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { sendChatMessage } from "@/lib/firebaseFunctions";
export default function SendMessage({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState<string>("");
  const { data: session } = useSession();

  const messageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (session?.user.id) {
        sendChatMessage(chatId, message, session.user.id);
        setMessage("");
      } else {
        throw new Error("Try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex gap-4 p-4" onSubmit={(e) => sendMessageHandler(e)}>
      <Input
        placeholder="Type in message in ANY language"
        className="flex-grow"
        onChange={(e) => messageInputHandler(e)}
        value={message}
      ></Input>
      <Button type="submit">Send</Button>
    </form>
  );
}
