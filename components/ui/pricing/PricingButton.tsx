import { getServerSession } from "next-auth";
import { Button } from "../button";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function PricingButton() {
  const session = await getServerSession(authOptions);
  const path = session ? "/register" : "/auth/login";
  return (
    <Button variant="default" className="flex-1">
      <Link href={path}>Get started</Link>
    </Button>
  );
}
