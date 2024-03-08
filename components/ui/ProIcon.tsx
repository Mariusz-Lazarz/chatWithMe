import { StarIcon } from "@heroicons/react/24/solid";
import useSubscriptionStore from "@/store/subscriptionStore";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function ProIcon() {
  const { tier } = useSubscriptionStore();
  return (
    <span className="flex items-center gap-2 font-bold">
      {tier === undefined ? (
        <LoadingSpinner width={"4"} height={"4"} />
      ) : tier === null ? (
        <Link href="/register">PRO Upgrade</Link>
      ) : tier === "Diamond" ? (
        <>
          <StarIcon className="h-[1.5rem] w-[1.5rem]" color="purple" />
          PRO
        </>
      ) : (
        <>
          <StarIcon className="h-[1.5rem] w-[1.5rem]" color="gold" />
          PRO
        </>
      )}
    </span>
  );
}
