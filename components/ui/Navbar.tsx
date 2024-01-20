import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import LanguageDropdown from "@/components/ui/LanguageDropdown";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const logged = true;

  return (
    <header className="header sticky top-0 z-50 bg-background">
      <nav className="flex justify-between items-center px-2 md:px-12 py-2">
        <Logo />
        <div className="flex items-center gap-1 md:gap-2">
          {logged && (
            <Link href="#">
              <Button
                variant="outline"
                size="icon"
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <ChatBubbleLeftRightIcon className="h-[1.5rem] w-[1.5rem]" />
              </Button>
            </Link>
          )}
          {logged && <LanguageDropdown />}
          {!logged && (
            <Link href="#" className="text-sm">
              Pricing
            </Link>
          )}
          <ModeToggle />
          {!logged && (
            <Button size="sm" variant="outline" className="text-sm border">
              Sign in
            </Button>
          )}
          {logged && <ProfileAvatar />}
        </div>
      </nav>
    </header>
  );
}
