import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function SendMessage() {
  return (
    <div className="flex gap-4 p-4">
      <Input
        placeholder="Type in message in ANY language"
        className="flex-grow"
      ></Input>
      <Button>Send</Button>
    </div>
  );
}
