import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function NavButtons() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Link href="#" className="flex items-center gap-1">
        Pricing
        <ArrowRightIcon className="h-[1rem] w-[1rem]" />
      </Link>
      <Button variant="destructive">
        <Link href="#">Get started</Link>
      </Button>
    </div>
  );
}
