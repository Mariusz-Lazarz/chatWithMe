import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import AddUserButton from "./AddUserButton";

export function AddUsers() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center" variant="secondary">
          <PlusCircleIcon className="h-[1rem] w-[1rem]" />
          <span>Add Members</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add members to chat</DialogTitle>
          <DialogDescription>
            Enter user email to add them to this chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="User email (needs to be registered)"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <AddUserButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
