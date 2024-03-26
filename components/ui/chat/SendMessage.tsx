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
    if (!session?.user.id) return;
    try {
      sendChatMessage(chatId, message, session.user.id);
      setMessage("");
    } catch (error) {
      throw error;
    }
  };
  return (
    <form className="flex gap-4 p-4" onSubmit={(e) => sendMessageHandler(e)}>
      <Input
        placeholder="Type in message in ANY language"
        className="flex-grow outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        onChange={(e) => messageInputHandler(e)}
        value={message}
      ></Input>
      <Button type="submit">Send</Button>
    </form>
  );
}
