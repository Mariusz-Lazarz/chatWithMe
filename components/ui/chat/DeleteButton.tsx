"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../use-toast";

export function DeleteButton({ currentChatId }: { currentChatId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const deleteChatHandler = async (currentChatId: string) => {
    if (!session) {
      return;
    }
    try {
      toast({
        title: "...Working",
        description: "We're deleting your chat...",
      });
      const chatDocRef = doc(
        db,
        "users",
        session.user.id,
        "chatIds",
        currentChatId
      );
      const participantsCollectionRef = collection(
        db,
        `chats/${currentChatId}/participants`
      );
      const chatsRef = doc(db, "chats", currentChatId);

      const querySnapshot = await getDocs(participantsCollectionRef);
      const deleteParticipantsPromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      const allDeletions = [
        deleteDoc(chatDocRef),
        ...deleteParticipantsPromises,
        deleteDoc(chatsRef),
      ];
      await Promise.all(allDeletions);
      toast({
        title: "Success",
        description: "Your chat has been deleted successfully",
        variant: "success",
        duration: 1000,
      });
      setTimeout(() => {
        router.push("/chat");
      }, 1000);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete chat. Please try again later!",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center" variant="destructive">
          <TrashIcon className="h-[1rem] w-[1rem]" />
          <span className="hidden md:block">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete chat</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            variant="destructive"
            onClick={() => deleteChatHandler(currentChatId)}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
