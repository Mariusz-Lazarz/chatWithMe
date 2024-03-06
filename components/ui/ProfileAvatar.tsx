"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import { Session } from "next-auth";
import ProIcon from "./ProIcon";
import useSubscriptionStore from "@/store/subscriptionStore";
import { useToast } from "./use-toast";

export default function ProfileAvatar({
  session,
}: {
  session: Session | null;
}) {
  const { toast } = useToast();
  const { status } = useSubscriptionStore();
  const createLinkPortal = async () => {
    if (status === "inactive")
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "You don't have an active subscription.",
        variant: "destructive",
        duration: 1000,
      });

    if (status === "active" && session) {
      window.location.assign(
        `https://billing.stripe.com/p/login/test_4gw3ct8jXe9eedy3cc?prefilled_email=${session.user?.email.replace(
          "@",
          "%40"
        )}`
      );
    }
  };
  if (!session)
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-sm border"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {" "}
          <AvatarImage src={session.user?.image || undefined} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {session.user?.name || "My profile"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ProIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => createLinkPortal()}>
          Subsciption
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
