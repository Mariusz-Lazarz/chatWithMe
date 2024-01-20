import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="#">
      <div className="flex items-center">
        <p className="hidden md:block text-lg">Chat with me</p>
        <Image src="/img/chatlogo.png" alt="chatlogo" width={60} height={10} />
      </div>
    </Link>
  );
}
