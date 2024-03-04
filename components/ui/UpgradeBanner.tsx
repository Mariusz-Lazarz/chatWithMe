"use client";

import useSubscriptionStore from "@/store/subscriptionStore";
import Link from "next/link";

export default function UpgradeBanner() {
  const { status } = useSubscriptionStore();

  if (status === "active" || status === undefined) return null;
  return (
    <div className="text-center bg-purple-800 p-2">
      <Link
        href={status === "inactive" ? "/register" : ""}
        className="hover:opacity-75 text-white"
      >
        Upgrade your plan to unlock PRO features!
      </Link>
    </div>
  );
}
