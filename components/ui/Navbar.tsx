import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import LanguageDropdown from "@/components/ui/LanguageDropdown";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpgradeBanner from "./UpgradeBanner";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className=" sticky top-0 z-50 bg-background">
        <div className="px-4 md:px-12 py-2 container text-center">
          <nav className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-1 md:gap-2">
              {!session && (
                <Link href="#" className="text-sm">
                  Pricing
                </Link>
              )}
              <ModeToggle />
              {session && (
                <Link href="/chat">
                  <Button
                    variant="outline"
                    size="icon"
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <ChatBubbleLeftRightIcon className="h-[1.5rem] w-[1.5rem]" />
                  </Button>
                </Link>
              )}
              {session && <LanguageDropdown />}
              <ProfileAvatar session={session} />
            </div>
          </nav>
        </div>
        <UpgradeBanner />
      </header>
    </>
  );
}
