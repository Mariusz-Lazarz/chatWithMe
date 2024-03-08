"use client";
import { useParams } from "next/navigation";

import { ShareLinkButton } from "@/components/ui/chat/ShareLinkButton";
import { DeleteButton } from "@/components/ui/chat/DeleteButton";
import { AddUserButton } from "@/components/ui/chat/AddUserButton";

export default function ChatWithId() {
  const { chatId } = useParams<{ chatId: string }>();
  return (
    <div className="flex justify-end">
      <div className="flex gap-4">
        <AddUserButton />
        <ShareLinkButton />
        <DeleteButton />
      </div>
    </div>
  );
}
