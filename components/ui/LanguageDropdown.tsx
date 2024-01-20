import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

export default function LanguageDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <GlobeAltIcon className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-0">
        <DropdownMenuItem>EN</DropdownMenuItem>
        <DropdownMenuItem>PL</DropdownMenuItem>
        <DropdownMenuItem>DE</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
