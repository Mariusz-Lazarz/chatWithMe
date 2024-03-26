"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import useSubscriptionStore from "@/store/languageStore";

const LANGUAGES = ["en", "pl", "de"];

export default function LanguageDropdown() {
  const { setLanguage } = useSubscriptionStore();
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
        {LANGUAGES.map((language, i) => (
          <DropdownMenuItem key={i} onClick={() => setLanguage(language)}>
            {language.toLocaleUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
