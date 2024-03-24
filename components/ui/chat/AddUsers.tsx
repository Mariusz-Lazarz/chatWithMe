import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";

export function AddUsers({ chatId }: { chatId: string }) {
  const [userEmail, setUserEmail] = useState<string>("");
  const userEmailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value.toLocaleLowerCase());
  };
  const inviteUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.includes("@")) return;
    try {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnap = await getDocs(q);
      let userId = "";
      if (querySnap.docs.length > 0) {
        userId = querySnap.docs[0].id;
      }
      if (!userId) return;
      await Promise.all([
        setDoc(doc(db, `chats/${chatId}/participants`, userId), { userId }),
        setDoc(doc(db, `users/${userId}/chatIds`, chatId), {
          chatId,
          joinedAt: serverTimestamp(),
        }),
      ]);
      setUserEmail("");
    } catch (error) {
      console.log(error);
    }
  };
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
        <form className="flex flex-col gap-4" onSubmit={inviteUserHandler}>
          <Input
            id="email"
            placeholder="User email (needs to be registered)"
            type="email"
            required
            value={userEmail}
            onChange={(e) => userEmailInputHandler(e)}
          />
          <Button type="submit" className="w-fit">
            Add user
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
